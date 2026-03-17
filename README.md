# Weather App

Aplicativo mobile de previsão do tempo desenvolvido como parte do processo seletivo.

---

## Sobre o projeto

O app permite que o usuário veja as condições climáticas atuais e a previsão dos próximos dias com base na sua localização ou em qualquer cidade do mundo que ele queira pesquisar.

A ideia foi construir algo próximo de um produto real: visual bem acabado, experiência fluida e código organizado como em um time de desenvolvimento.

---

## Demonstração

<div align="center">

https://github.com/user-attachments/assets/b2a879cb-1111-4b6f-b007-423cf7750820

</div>

---

## Funcionalidades

- **Clima atual** — temperatura, sensação térmica, umidade, vento, pressão, visibilidade e índice UV
- **Qualidade do ar** — nível de AQI com classificação (Boa, Regular, Moderada, Ruim, Péssima) e valores de PM2.5 e NO₂
- **Previsão horária** — próximas 8 horas com ícone, temperatura e chance de chuva
- **Previsão dos próximos 7 dias** — temperatura máxima e mínima por dia
- **Gradiente dinâmico** — o fundo muda de cor de acordo com o clima e o horário do dia
- **Busca por cidade** — pesquisa qualquer cidade do mundo pelo nome
- **Múltiplas cidades** — salva favoritas e alterna entre elas via drawer lateral
- **Localização por GPS** — usa a localização real do dispositivo como padrão

---

## Decisões técnicas

**Arquitetura em camadas** — a lógica de negócio (chamadas à API, regras de dados) fica separada da interface, facilitando manutenção e testes.

**Design system próprio** — componentes base (`Text`, `Button`, `Box`) com tokens de design para cores, espaçamentos e bordas, garantindo consistência visual em todo o app.

**Testes automatizados** — todos os componentes e as duas telas principais têm testes cobrindo renderização, interações, estados de loading/erro e integrações.

**Estado global simples** — Context API do React para gerenciar cidade ativa e gradiente, sem dependência de bibliotecas externas.

---

## Tecnologias

| | |
|---|---|
| React Native + Expo | Base do aplicativo mobile |
| TypeScript | Tipagem estática em todo o projeto |
| React Query | Cache e gerenciamento das chamadas à API |
| Shopify Restyle | Design system e tokens de estilo |
| OpenWeatherMap API | Dados de clima, previsão e qualidade do ar |
| Jest + React Native Testing Library | Testes automatizados |

---

## Como rodar

```bash
npm install
npm start
```

> Necessário configurar uma chave da [OpenWeatherMap API](https://openweathermap.org/api) nas variáveis de ambiente.
