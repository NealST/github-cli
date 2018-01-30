import * as cfonts from 'cfonts'
interface cfontsOptions {
  font?: string;
  align?: string;
  colors?: Array<string>;
  background?: string;
  letterSpacing?: number;
  lineHeight?: number;
  space?: boolean;
  maxLength?: string;
}
export default function textFonts (text: string, textOptions?: cfontsOptions) {
  cfonts.say(text, Object.assign({
    font: 'block',
    align: 'left',
    colors: ['white'],
    background: 'Black',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0'  
  }, textOptions || {}))
}