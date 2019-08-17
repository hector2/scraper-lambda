'use strict'

import crypto from 'crypto'
import middy from "middy";
import chromium from "chrome-aws-lambda";
import puppeteer, { Browser } from "puppeteer-core";
import {
  cors,
  doNotWaitForEmptyEventLoop,
  httpHeaderNormalizer,
  httpErrorHandler,
  jsonBodyParser,
  validator
} from "middy/middlewares";

const FAIL_LOGIN_ERR = "login incorrecto"

interface IResponse {
  statusCode: number,
  content: string | IMovement[]
}

const handler = async (event: any) => {
  const executablePath = event.isOffline
    ? "./node_modules/puppeteer/.local-chromium/linux-674921/chrome-linux/chrome"
    : await chromium.executablePath;

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath
  });





  const hrstart = process.hrtime()
  const result = await getResult(browser, event.body.username, event.body.password)
  const hrend = process.hrtime(hrstart)




  console.info(
    'Execution time (hr): %ds %dms',
    hrend[0],
    hrend[1] / 1000000
  )

  //ws.send(JSON.stringify({ result: enc.toString('hex') }))


  return {
    statusCode: result.statusCode,
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(result)
  };



};



interface IMovement {
  id: string
  date: string
  concept: string
  amount: number
}


const separator = '|||'

function removeDuplicates(coll: IMovement[]) {
  const result = new Map<string, IMovement>()
  for (const i of coll) {
    const temp = result.get(i.id)

    if (temp) {
      temp.amount = temp.amount + i.amount
    } else if (i.date && i.concept && i.amount) {
      result.set(i.id, i)
    }
  }

  const resultArr = []

  for (const j of result.values()) {
    resultArr.push(j)
  }

  return resultArr
}

function scrapLine(line: string): IMovement {
  const parts: string[] = line.split(separator)

  if (parts[2]) {
    parts[2] = parts[2].replace(',', '.')
  }

  const result: IMovement = {
    id: crypto
      .createHash('sha256')
      .update(JSON.stringify(parts))
      .digest('hex'),
    date: parts[0],
    concept: parts[1],
    amount: parseFloat(parts[2]),
  }
  return result
}


function waitForFrame(
  page: puppeteer.Page,
  frameName: string
): Promise<puppeteer.Frame> {

  let fulfill: { (value?: puppeteer.Frame | PromiseLike<puppeteer.Frame>): void; (arg0: puppeteer.Frame): void; }

  const promise: Promise<puppeteer.Frame> = new Promise(x => (fulfill = x))
  checkFrame()
  return promise

  function checkFrame() {
    const frame = page.frames().find(f => f.name() === frameName)
    if (frame) {
      fulfill(frame)
    } else {
      page.once('frameattached', checkFrame)
    }
  }
}

async function getResult(browser: Browser, username: string, password: string): Promise<IResponse> {
  try {
    const page = await browser.newPage()

    await page.setRequestInterception(true)
    page.on('request', req => {
      if (req.resourceType() == 'font' || req.resourceType() == 'image') {
        req.abort()
      } else {
        req.continue()
      }
    })

    await page.goto(
      'https://www.cajamar.es/es/comun/acceder-a-banca-electronica-reintentar/'
    )
    await page.setViewport({ width: 1920, height: 1080 })
    await page.type('#COD_NEW3', username)
    await page.type('#PASS_NEW3', password)
    await page.click('.lnkAceptar')
    try {
      await page.waitFor('#principaln1_cuentas', { timeout: 7000 })
    } catch (e) {
      throw FAIL_LOGIN_ERR
    }
    //ws.send('10%')
    await page.click('#principaln1_cuentas')
    //ws.send('20%')
    await page.click('a[data-id=n3_movimientos]')
    page.on('console', msg => console.log('PAGE LOG:', msg.text()))

    const frame = await waitForFrame(page, 'contenido')
    //ws.send('30%')
    await frame.waitForSelector('button')

    await frame.evaluate(() => {
      // document.querySelector(".z-spinner-input").textContent = "0"
      document.querySelector<HTMLInputElement>('.z-spinner-input').value =
        '0'
    })

    await frame.type('.z-spinner-input', '180')

    await frame.focus('button')

    await frame.waitFor(1000)

    await frame.click('button')
    //ws.send('40%')

    const frame2 = await waitForFrame(page, 'contenido')
    await frame2.waitForSelector('.z-column-content')

    await frame2.click('.z-column-content')
    await frame2.waitFor('.z-icon-caret-up')
    //ws.send('60%')
    await frame2.click('.z-column-content')
    await frame2.waitFor('.z-icon-caret-down')
    //ws.send('70%')

    const movements = await frame2.evaluate(() => {
      let result = ''
      const numberCols = 3
      const elements = Array.from(
        document.querySelectorAll(
          ".z-cell[data-title='Concepto'],.z-cell[data-title='Fecha'],.z-cell[data-title='Importe']"
        )
      )

      elements.forEach((element, index) => {
        const i = index + 1

        if (i % numberCols === 0) {
          result += element.textContent + '\n'
        } else {
          result += element.textContent + '|||'
        }
      })

      return result
    })
    //ws.send('80%')

    const resFinal = movements.split('\n').map(x => {
      return scrapLine(x)
    })

    //ws.send('100%')

    return {statusCode: 200, content: removeDuplicates(resFinal)}
  } catch (e) {
    console.log("error while scraping", e)
    if (e === FAIL_LOGIN_ERR) {
      return {statusCode: 401, content: "Fail login"}
    } else {
      return {statusCode: 500, content: "Internal error"}
    }

  } finally {
    console.log('cerrando browser')
    await browser.close()
  }
}


const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        username: { type: 'string', minLength: 1 },
        password: { type: 'string', minLength: 1 }
      },
      required: ['username', 'password'] // Insert here all required event properties
    }
  }
}




export const scrap = middy(handler)
  .use(jsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
  .use(validator({ inputSchema })) // validates the input
  .use(httpHeaderNormalizer())
  .use(cors())
  .use(doNotWaitForEmptyEventLoop())
  .use(httpErrorHandler());
