# Calc Distances API

## Sobre

O objetivo da aplicação é calcular e comparar a distancia euclidiana entre dois ou mais endereços fornecidos. Algumas das funcionalidades:

- Calcular a distancia entre dois endereços;
- Calcular a distancia entre diversos endereços fornecidos, descobrindo quais estão mais próximos e quais estão mais distantes.

## Technologias

As seguintes tecnologias foram utilizadas no desenvolvimento deste projeto:

<p>
<img style='margin: 5px;' src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img style='margin: 5px;' src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'>
<img style='margin: 5px;' src='https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white'>
<img style='margin: 5px;' src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
<img style='margin: 5px;' src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E"/>
<img style='margin: 5px;' src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white
"/>

Para encontrar a geolocalização dos endereços no mapa foi utilizada a api de Geolocalização do google. Saiba mais em https://developers.google.com/maps/documentation/geocoding/start

</p>

## Como executar

Você pode acessar essa aplicação diretamente através da url: https://calc-addresses-distances.herokuapp.com/

Caso prefira rodar localmente basta seguir os seguintes passos:

1. Clone este repositório:

```bash
git clone https://github.com/leoguzi/calc-distance-api.git
```

2. Acesse a pasta contendo os arquivos clonados:

```bash
cd calc-distance-api/
```

3. Instale as dependencias:

```bash
npm i
```

4. Configure as variáveis de ambiente criando um arquivo .env conforme o exemplo fornecido.

- A chave da api de geolocaliação pode ser obtida seguindo as instruções em https://developers.google.com/maps/documentation/geocoding/start

5. Rode a aplicação em produção:

```bash
npm start
```

6. A api deve estar pronda para receber requisições em http://localhost:PORT (porta configurada no arquivo .env).

## Outras Informações

- Caso prefira executar a aplicação no ambiente de desenvolvimento basta configurar um arquivo .env.dev, utilizando o mesmo exemplo e utilizar o comando:

```bash
npm run dev
```

Caso deseje executar os testes, deve ser configurado um arquivo .env.test, e em seguida o comando

```bash
npm run test
```

or

```bash
npm run test-watch
```

## Guia de utilização

### Requisição POST para a rota /addresses seguindo as seguintes regras:

O corpo da requisição deve conter um array com pelo menos dois objetos no seguinte formato:

```json
{
    "street": string,
    "number": string | number,
    "neighborhood": string,
    "city": string,
    "state": string,
    "zipCode": string | number
}
```

- Apenas a rua (campo street) é uma informação obrigatória, o restante dos campos são opcionais;
- O campo "state" deve ser uma string com apenas 2 caracteres;
- Quando maior o numero de informações fornecidas, maior a precisão do endereço.

## Respostas:

- A resposta da aplicação será 422(Invalid Body) nos seguinter casos:

  - Nenhuma informação foi fornecida;
  - Foram fornecidos menos de 2 endereços;
  - Foi fornecido pelo menos um endereço com o campo "street" vazio;
  - Foi fornecido um valor com mais de 2 caracteres no campo "state".

- A resposta da aplicação sera 404(Not Found) caso pelo menos um dos endereços não seja encontrado.

- Caso todas as informações estiverem corretas a aplicação ira retornar 200(OK) e as informações conforme o exemplo:

```json
{
  "closestAddresses": {
    "address1": "R. Augusta, São Paulo - SP, Brazil",
    "address2": "Av. Brg. Faria Lima, São Paulo - SP, Brazil",
    "distance": 3.85
  },
  "farthestAddresses": {
    "address1": "R. Ângelo Albiero, 172 - Oficina, Videira - SC, 89560-000, Brazil",
    "address2": "R. Augusta, São Paulo - SP, Brazil",
    "distance": 629.11
  },
  "otherDistances": [
    {
      "address1": "R. Cap. Romualdo de Barros - Carvoeira, Florianópolis - SC, 88040-600, Brazil",
      "address2": "R. Ângelo Albiero, 172 - Oficina, Videira - SC, 89560-000, Brazil",
      "distance": 297.15
    },
    {
      "address1": "R. Cap. Romualdo de Barros - Carvoeira, Florianópolis - SC, 88040-600, Brazil",
      "address2": "R. Augusta, São Paulo - SP, Brazil",
      "distance": 495.61
    },
    {
      "address1": "R. Cap. Romualdo de Barros - Carvoeira, Florianópolis - SC, 88040-600, Brazil",
      "address2": "Av. Brg. Faria Lima, São Paulo - SP, Brazil",
      "distance": 492.24
    },
    {
      "address1": "R. Ângelo Albiero, 172 - Oficina, Videira - SC, 89560-000, Brazil",
      "address2": "Av. Brg. Faria Lima, São Paulo - SP, Brazil",
      "distance": 625.27
    }
  ]
}
```

- Nos objetos "closestAddresses" e "farthestAddresses", se encontram respectivamente os endereços mais próximos e os mais distantes.

- No array "otherDistances" são encontradas as distancias de todas as outras combinações de endereços possiveis.

- Todas as distancias são em Km.

- Por se tratar da distancia euclidiana, o raio da terra não é considerado, o que pode gerar diferenças entre as distancias calculadas e as reais.

## Contato

Caso tenha alguma duvida ou feedback, sinta-se a vondade para entrar em contato através do meu email leoguzi@hotmail.com ou linkedin https://www.linkedin.com/in/leoguzi/.
