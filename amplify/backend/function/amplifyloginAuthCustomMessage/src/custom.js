/**
 * REMEMBER TO ADD PROCESS ENV: TITLE, SITE_URL and SITE_LOGO
 */
 function generateEmailBody(emailBody) {
	return `
<html>
  <body style="background-color:#ffffff">
    <table align="center" cellpadding="0" cellspacing="0" style="width:100%; background-color:#ffffff">
      <tbody>
        <tr>
          <td style="text-align:center">
            <img alt="Logo" src="${process.env.SITE_LOGO}" style="height:48px; width:48px" />
            <p style="color:#6366f1; margin-top:2px"><strong>${process.env.TITLE}</strong></p>
          </td>
        </tr>
        <tr>
          <td style="padding-top:10px; text-align:left">
          ${emailBody}
          </td>
        </tr>
				<tr>
				<td style="padding-top:25px; text-align:center">
					${process.env.SITE_URL}
				</td>
			</tr>
      </tbody>
    </table>
  </body>
</html>
`;
}

function handleTranslation(locale) {
	let lang = undefined;
	switch (locale) {
		case 'en-US':
			lang = require('./en-US');
			return lang;
		case 'pt-BR':
			lang = require('./pt-BR');
			return lang;
		default:
			lang = require('./en-US');
			return lang;
	}
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
	console.log(`EVENT: ${JSON.stringify(event)}`);
	const lang = handleTranslation(event.request.userAttributes.locale)
	switch (event.triggerSource) {
		case 'CustomMessage_SignUp':
			return lang.signUpMessage(event, generateEmailBody);
		case 'CustomMessage_ResendCode':
			return lang.signUpMessage(event, generateEmailBody);
		case 'CustomMessage_ForgotPassword':
			return lang.forgotPassword(event, generateEmailBody);
		case 'CustomMessage_UpdateUserAttribute':
			return lang.updateUserAttributeMessage(event, generateEmailBody);
		case 'CustomMessage_VerifyUserAttribute':
			return lang.verifyUserAttribute(event, generateEmailBody);
		default:
			return event;
	}
};
