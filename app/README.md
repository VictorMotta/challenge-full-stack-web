# Como Rodar a Aplicação Vue

## **1. Instalar o Yarn**

A aplicação utiliza o **Yarn** como gerenciador de pacotes. Caso ainda não tenha o Yarn instalado, siga os passos abaixo:

### **1.1 Verificar se o Yarn está instalado**

Execute o seguinte comando para verificar se o Yarn está instalado:

```sh
yarn --version
```

Se o comando retornar um número de versão, o Yarn já está instalado e você pode prosseguir para a próxima etapa.

### **1.2 Instalar o Yarn (caso não esteja instalado)**

Se o Yarn não estiver instalado, utilize o seguinte comando:

```sh
npm install -g yarn
```

Após a instalação, verifique novamente com:

```sh
yarn --version
```

---

## **2. Configurar variáveis de ambiente**

Antes de rodar a aplicação, é necessário configurar as variáveis de ambiente.

### **2.1 Verificar se está na pasta correta**

Para garantir que você está dentro da pasta `app`, execute o seguinte comando:

```sh
pwd
```

Se o caminho exibido não terminar com `/app`, então entre na pasta correta com:

```sh
cd app
```

### **2.2 Copiar o arquivo de variáveis de ambiente**

Agora copie o arquivo `.env.example` para `.env`:

```sh
cp .env.example .env
```

### **2.3 Editar o arquivo `.env`**

Abra o arquivo `.env` e configure os valores necessários, como URLs de APIs e outras configurações específicas.

---

## **3. Instalar as dependências**

Agora, instale as dependências do projeto utilizando Yarn:

```sh
yarn install
```

---

## **4. Rodar a aplicação**

Para iniciar a aplicação em modo de desenvolvimento, execute:

```sh
yarn dev
```

A aplicação estará disponível no endereço indicado no terminal (geralmente `http://localhost:5173`).

---

## **5. Construir a aplicação para produção**

Se desejar gerar a build otimizada para produção, execute:

```sh
yarn build
```

Isso criará os arquivos otimizados dentro da pasta `dist/`.

---

## **6. Visualizar a build**

Para testar a versão de produção localmente:

```sh
yarn preview
```

---

Agora sua aplicação Vue está pronta para ser utilizada! 🚀
