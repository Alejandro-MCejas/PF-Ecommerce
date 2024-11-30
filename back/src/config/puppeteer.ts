import * as puppeteer from 'puppeteer'

export async function generatePDF(htmlContext: string): Promise<Buffer> {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setContent(htmlContext)
    const pdfUint8Array = await page.pdf({ format: 'A4' })
    await browser.close()

    const pdfBuffer = Buffer.from(pdfUint8Array)

    return pdfBuffer
}