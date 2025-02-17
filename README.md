# Como Rodar a Plataforma Localmente

## **Instalação do Docker** (caso não esteja instalado)

<details>
  <summary>Clique aqui para ver como instalar o Docker</summary>

### **Linux**

#### **1. Configurar o repositório do Docker**

Execute os seguintes comandos no terminal:

```sh
# Atualizar pacotes e instalar dependências necessárias
sudo apt-get update
sudo apt-get install ca-certificates curl

# Criar diretório para armazenar a chave do repositório
sudo install -m 0755 -d /etc/apt/keyrings

# Adicionar a chave GPG oficial do Docker
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Adicionar o repositório do Docker à lista de fontes do Apt
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Atualizar pacotes novamente
sudo apt-get update
```

#### **2. Instalar o Docker**
Para instalar a versão mais recente do Docker, execute:

```sh
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Verifique se a instalação foi bem-sucedida:
```sh
sudo docker run hello-world
```

#### **3. Executar Docker sem sudo**

Para permitir o uso do Docker sem precisar de `sudo`, siga os passos abaixo:

```sh
# Criar o grupo docker
sudo groupadd docker

# Adicionar seu usuário ao grupo docker
sudo usermod -aG docker $USER
```

Agora, saia da sessão e faça login novamente para aplicar as mudanças.

Se estiver rodando o Linux em uma máquina virtual, pode ser necessário reiniciar a VM.

Caso queira aplicar as mudanças imediatamente sem reiniciar, execute:

```sh
newgrp docker
```

Para testar se o Docker pode ser executado sem `sudo`:

```sh
docker run hello-world
```

### **Windows**

Baixe e instale o **Docker Desktop**:
[Download Docker para Windows](https://www.docker.com/products/docker-desktop/)

Após a instalação, reinicie o computador e verifique a versão:
```sh
docker --version
```

### **MacOS**

Baixe e instale o **Docker Desktop**:
[Download Docker para Mac](https://www.docker.com/products/docker-desktop/)

Após a instalação, verifique a versão:
```sh
docker --version
```
</details>

---

## **Rodando a API**

### **1. Configurar variáveis de ambiente**

Acesse a pasta da API:
```sh
cd api
```
Copie o arquivo `.env.example` para `.env`:
```sh
cp .env.example .env
```
Edite o arquivo `.env` e configure os valores necessários, como a conexão com o banco de dados.

Volte para a raiz do projeto:
```sh
cd ..
```
Agora, entre na pasta do aplicativo:
```sh
cd app
```
Copie o arquivo `.env.example` para `.env`:
```sh
cp .env.example .env
```
Edite o arquivo `.env` e configure os valores necessários.

Volte novamente para a raiz do projeto:
```sh
cd ..
```

---

### **2. Subir os contêineres da aplicação**
Para iniciar a API com **Docker Compose**, execute o seguinte comando:
```sh
docker compose up --build -d
```
- O `--build` garante que a aplicação seja reconstruída com base nas alterações mais recentes.
- O `-d` executa os contêineres em segundo plano (modo "detached").

---

### **3. Parar a aplicação**
Para parar e remover os contêineres e volumes criados:
```sh
docker compose down -v
```
- O `-v` remove os volumes associados aos contêineres para evitar dados residuais.

---

Agora sua API está pronta para ser usada! 🚀

Você pode testá-la acessando: [http://64.23.236.72/](http://64.23.236.72/)

