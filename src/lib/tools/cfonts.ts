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
    font: '3d',
    align: 'center',
    colors: ['magenta'],
    background: 'black',
    letterSpacing: 1,
    lineHeight: 0.00005,
    space: true,
    maxLength: '0'  
  }, textOptions || {}))
}