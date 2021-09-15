import emailMask from "text-mask-addons/dist/emailMask";
const phoneMask = [
  1,
  /[3-9]/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/
];
const dateMask = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];
const masks = {
  phone: phoneMask,
  email: emailMask,
  date: dateMask
};

export default masks;
