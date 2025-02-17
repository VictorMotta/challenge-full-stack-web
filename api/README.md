# Como Rodar a API Localmente

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

Para garantir que você está dentro da pasta `api`, execute o seguinte comando:

```sh
pwd
```

Se o caminho exibido não terminar com `/api`, então entre na pasta correta com:

```sh
cd api
```

Copie o arquivo `.env.example` para `.env`:

```sh
cp .env.example .env
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

##### **OBS:** Para testar a api localmente faça um get nessa rota: http://localhost:4000/health

# Documentação da API

##### **Link local:** http://localhost:4000/

<details>
  <summary>Rotas de Usuário</summary>

### Criar um usuário:

```
Caminho: /user/sign-up
Método: POST
Rota: Não autenticada
```

#### Body:

```
{
    "name":"Yasmin",
    "email": "yasmin@gmail.com",
    "password": "123456",
    "role": "teacher"
}
```

#### Resposta:

```
StatusCode: 201
Payload: Created
```

### Entrar:

```
Caminho: /user/sign-in
Método: POST
Rota: Não autenticada
```

#### Body:

```
{
    "email": "yasmin@gmail.com",
    "password": "123456"
}
```

#### Resposta:

```
StatusCode: 200
Payload:
{
    "user": {
        "id": 2,
        "name": "Yasmin",
        "email": "yasmin@gmail.com",
        "role": "TEACHER",
        "created_at": "2025-02-17T11:47:36.692Z",
        "updated_at": "2025-02-17T11:47:36.692Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJURUFDSEVSIiwiaWF0IjoxNzM5NzkyODU5LCJleHAiOjE3NDAzOTc2NTl9.nCefY_EdqAjS8Zzq7S6O-rkF-6beGHINx4HmtytoiNk"
}
```

### Listar Usuário atual:

```
Caminho: /user
Método: GET
Rota: Autenticada
```

#### Resposta:

```
StatusCode: 200
Payload:
{
    "id": 2,
    "name": "Yasmin",
    "email": "yasmin@gmail.com",
    "role": "TEACHER",
    "password": "$2b$12$IaUvXhVLP294pHTTDlCNpOxmCzeiG7vIlaIfSsvk9sOt22Zqh2asq",
    "created_at": "2025-02-17T11:47:36.692Z",
    "updated_at": "2025-02-17T11:47:36.692Z"
}
```

</details>

<details>
  <summary>Rotas de Estudantes</summary>

### Listar todos usuários:

```
Caminho: /student
Método: GET
Rota: Authenticada
Roles: TEACHER e ADMIN
```

#### Resposta:

```
StatusCode: 200
Payload:
{
    "students": [
        {
            "id": 1,
            "name": "Aluno 1",
            "email": "aluno_um@email.com.br",
            "registration_number": "RN321321333333333333",
            "document_number": "12312312312",
            "active": true,
            "created_at": "2025-02-17T11:32:09.853Z",
            "updated_at": "2025-02-17T11:32:09.853Z"
        }
    ]
}
```

### Criar um estudante:

```
Caminho: /student
Método: POST
Rota: Authenticada
Roles: ADMIN
```

#### Body:

```
{
    "name": "victor",
    "email": "victor@gmail.com",
    "document_number": "12312312313"
}
```

#### Resposta:

```
StatusCode: 201
Payload: Created
```

**OBS:** Se chama um usuário desativado, o ativa novamente.

### Atualizar os dados de um estudante:

```
Caminho: /student
Método: PATCH
Rota: Authenticada
Roles: ADMIN
```

#### Body:

```
{
    "select": {
        "student_id": 1
    },
    "update": {
        "name": "Aluno2",
        "email": "aluno2@gmail.com"
    }
}
```

#### Resposta:

```
StatusCode: 200
Payload:
{
    "student": {
        "id": 1,
        "name": "Aluno2",
        "email": "aluno2@gmail.com",
        "registration_number": "RN321321333333333333",
        "document_number": "12312312312",
        "active": true,
        "created_at": "2025-02-17T11:32:09.853Z",
        "updated_at": "2025-02-17T12:02:04.242Z"
    }
}
```

### Deletar um estudante:

```
Caminho: /student
Método: DELETE
Rota: Authenticada
Roles: ADMIN
```

#### Query String Parameter:

```
?student_id=5
```

#### Resposta:

```
StatusCode: 204
Payload:
```

**OBS:** Não deleta o usuário do banco de dados, apenas desativa.

</details>
