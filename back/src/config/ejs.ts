import * as ejs from 'ejs'
import { join } from 'path'

export const ejsConfig = {
    templateDirectory: join(__dirname, '..', 'templates')
}

export const renderTemplate = (templateName: string, context: any): Promise<string> => {
    const templatePath = join(ejsConfig.templateDirectory, `${templateName}.ejs`)
    return ejs.renderFile(templatePath, context)
}