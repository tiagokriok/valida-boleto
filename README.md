# EWally Challenge

A API consiste em validar a linha digitável de boletos, seguindo as regras para cada tipo de boleto.

## Stack utilizada

**Back-end:** Node, Express

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/tiagokriok/valida-boleto.git
  or
  git clone git@github.com:tiagokriok/valida-boleto.git
```

Entre no diretório do projeto

```bash
  cd valida-boleto
```

Instale as dependências

```bash
  npm install
  or
  yarn
```

Inicie o servidor

```bash
  npm run start
  or
  yarn start
```

## Testes Unitários

- Executar os testes: `yarn test`

1. **`should be able to validate bank bonds`**: Valida Títulos Bancários.
2. **`should be able to validate concessionaire payments`**: Valida Boletos de Cobrança.
3. **`should throw an error if has letters in typeable line`**: Verifica se tiver letras em uma linha digitável.
4. **`should throw an error if invalid verifier digit module 10`**: Valida os dígitos verificadores de acordo com o modulo 10.
5. **`should throw an error if invalid verifier digit module 11`**: Valida os dígitos verificadores de acordo com o modulo 11.

## Documentação da API

### Retorna Código de Barra, Valor e Data de Validade

O Arquivo `Insomnia_Doc_API` pode ser importado no Insomnia para facilitar os teste da API.

### Exemplos

- Boleto do tipo Título
  - 34191093217220104303024750000002388540000033320
  - 34191096363478638719042686080005789560000028913

- Boleto do tipo Convênio
  - 858200000015671402702007341196306007014220210799
  - 826800000018416504770007002022151415604401001044
  - 836600000050066300470003000000002303147403220089

```http
  GET http://localhost:3333/boleto/:linha
```

| Parâmetro | Tipo     | Descrição                                    |
| :-------- | :------- | :------------------------------------------- |
| `linha`   | `string` | **Obrigatório**. A linha digitável do boleto |

### Retorno JSON

```json
{
    “barCode”: “21299758700000020000001121100012100447561740”,
    “amount”: “20.00”,
    “expirationDate”: “2018-07-16”
}
```
