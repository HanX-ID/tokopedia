const axios = require("axios");
const { URLSearchParams } = require("url");

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  "Mozilla/5.0 (X11; Linux x86_64)",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)",
  "Mozilla/5.0 (Android 11; Mobile; rv:89.0)",
];

const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const bold = (text) => `\x1b[1m${text}\x1b[0m`;

async function main(nomor) {
  const ua = userAgents[Math.floor(Math.random() * userAgents.length)];
  try {
    const page = await axios.get(
      `https://accounts.tokopedia.com/otp/c/page?otp_type=116&msisdn=${nomor}&ld=https://accounts.tokopedia.com&ob=1`,
      { headers: { "User-Agent": ua } }
    );

    const token = page.data.match(/id="Token" value="(.*?)"/)?.[1];
    if (!token) return console.log(red("\n[ X ] Gagal mengambil token\n"));

    const form = new URLSearchParams({
      otp_type: "116",
      msisdn: nomor,
      tk: token,
      email: "",
      original_param: "",
      user_id: "",
      signature: "",
      number_otp_digit: "6",
    });

    const kirim = await axios.post(
      "https://accounts.tokopedia.com/otp/c/ajax/request-wa",
      form,
      {
        headers: {
          "User-Agent": ua,
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      }
    );

    if (kirim.data?.success) {
      console.log(green(`\n[ ✓ ] OTP berhasil dikirim ke ${bold(nomor)}\n`));
    } else {
      console.log(red("\n[ X ] Gagal mengirim OTP\n"), kirim.data);
    }
  } catch (err) {
    console.log(red("\n[ X ] Error:"), err.message);
  }
}

module.exports = { main };