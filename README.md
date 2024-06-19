## ToDoApp
O TodoApp é um aplicativo completo para gerenciar suas tarefas do dia a dia, desde a criação até a finalização, com uma interface intuitiva e design moderno. O projeto é composto por:

* **React Native:** Framework principal para desenvolvimento de interfaces mobile multiplataforma.
* **Expo:** Ferramenta que facilita a criação e o deploy de apps React Native, oferecendo roteamento e outras funcionalidades.
* **Tamagui:** Biblioteca de UI completa para React Native, com diversos componentes prontos para uso e alta customização.
* **json-server:** Simulador de backend que utiliza arquivos JSON para persistir dados.

**Pré-requisitos:**

* Node.js instalado (versão LTS ou superior)
* yarn ou npm instalado globalmente (opcional, mas recomendado)

**Passo a Passo:**

**1. Criação do projeto:**

1. Entre no diretório do projeto.
2. Execute o seguinte comando para instalar as dependências:

```bash
npm install
// ou
yarn install
```

**3. Configuração do backend:**

1. O arquivo `db.json` está dentro do diretório `backend`. Se precisar reconfigurar algo na parte do backend ou apenas visualizar os dados da aplicação, você pode visualizar seu conteúdo neste arquivo
2. Para rodar a aplicação backend separadamente, rode:

```bash
npm run back
```

**4. Rodando a aplicação web:**

1. No mesmo terminal, execute o seguinte comando para iniciar a aplicação web:

```bash
npm run web
```


**Observações:**

* Para mais informações sobre o Tamagui, consulte a documentação oficial: [https://tamagui.dev/](https://tamagui.dev/)
* Para mais informações sobre o json-serve, consulte a documentação oficial: [https://github.com/typicode/json-server/tree/v0](https://github.com/typicode/json-server/tree/v0)

