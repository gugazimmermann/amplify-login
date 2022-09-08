async function signUpMessage(event, generateEmailBody) {
	event.response = {
		emailSubject: `${process.env.TITLE}: Código de Verificação`,
		emailMessage: generateEmailBody(`
      <p>Bem Vindo ao ${process.env.TITLE},</p>
      <p>Seu email de cadastrado é ${event.request.userAttributes.email} e seu código de verificação é: ${event.request.codeParameter}</p>
      <br />
      <p>Digite seu código no campo informado ou <a href="${process.env.SITE_URL}confirmar-registro?lang=${event.request.userAttributes.locale}&email=${event.request.userAttributes.email}&code=${event.request.codeParameter}">clique aqui</a>.</p>
      `),
	};
	return event;
}

async function forgotPassword(event, generateEmailBody) {
	event.response = {
		emailSubject: `${process.env.TITLE}: Recuperar Senha`,
		emailMessage: generateEmailBody(`
      <p>Seu código de recuperação de senha é: ${event.request.codeParameter}</p>
      <br />
      <p>Digite seu código no campo informado ou <a href="${process.env.SITE_URL}redefinir-senha?lang=${event.request.userAttributes.locale}&email=${event.request.userAttributes.email}&code=${event.request.codeParameter}">clique aqui</a>.</p>
      `),
	};
	return event;
}

async function updateUserAttributeMessage(event, generateEmailBody) {
	event.response = {
		emailSubject: `${process.env.TITLE}: Perfil Atualizado`,
		emailMessage: generateEmailBody(
			`<p>Seu Perfil foi atualizado, utilize o código: ${event.request.codeParameter}</p>`
		),
	};
	return event;
}

async function verifyUserAttribute(event, generateEmailBody) {
	event.response = {
		emailSubject: `${process.env.TITLE}: Email Alterado`,
		emailMessage: generateEmailBody(`<p>Para alterar o email, utilize o código: ${event.request.codeParameter}</p>`),
	};
	return event;
}

module.exports = {
	signUpMessage,
	forgotPassword,
	updateUserAttributeMessage,
	verifyUserAttribute,
};
