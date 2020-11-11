var ambiente = "TEST",
  configSistema = {
    servidor: "",
    panelConfigs: {
      logo: {
        logomarca: "",
        logoMenu: "",
        logo: ""
      },
      titulo: "",
      linkRegistroUsuario: ""
    }
  },
  sistema = window.location.href;

if (ambiente === "DEV") {
	configSistema.servidor = "http://localhost:5600";
} else if (ambiente === "TEST") {
	configSistema.servidor = "https://sandbox.rasplus.com.br";
} else if (ambiente === "PROD") {
	configSistema.servidor = "https://production.rasplus.com.br";
}

if (sistema.includes("painel.mimoplus.com.br")) {
  configSistema.panelConfigs.logo.logomarca = "/content/files/logos/mimoplus/logomarca.png";
  configSistema.panelConfigs.logo.logoMenu = "/content/files/logos/mimoplus/logomenu.png";
  configSistema.panelConfigs.logo.logo = "/content/files/logos/mimoplus/logo.png";
  configSistema.panelConfigs.titulo = "MIMO+";
  configSistema.panelConfigs.linkRegistroUsuario = "https://painel.mimoplus.com.br/";
} else if (sistema.includes("painel.rasplus.com.br") || sistema.includes("dev.rasplus.com.br") || sistema.includes("localhost")) {
  configSistema.panelConfigs.logo.logomarca = "/content/files/logos/rasplus/logomarca.png";
  configSistema.panelConfigs.logo.logoMenu = "/content/files/logos/rasplus/logomenu.png";
  configSistema.panelConfigs.logo.logo = "/content/files/logos/rasplus/logo.png";
  configSistema.panelConfigs.titulo = "RAS Plus";
  configSistema.panelConfigs.linkRegistroUsuario = "https://painel.rasplus.com.br/";
}

class Config {
	static getHeaders () {
		return {
			"X-Token": AdminData.getXToken(),
			"Content-Type": "application/json"
		};
  }

	static getClientHeaders () {
		return {
      "X-Token": AdminData.getClientToken(),
      "CompanyToken": AdminData.getCompanyToken(),
			"Content-Type": "application/json"
		};
  }
}
