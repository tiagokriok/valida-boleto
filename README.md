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

## Documentação da API

### Retorna Código de Barra, Valor e Data de Validade

```http
  GET /:linha
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
