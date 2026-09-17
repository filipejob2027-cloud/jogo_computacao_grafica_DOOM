# jogo_computacao_grafica
Projeto de "Retro Gaming" para a cadeira de Computação Gráfica
# Jogo de Computação Gráfica (estilo Doom)

Um FPS (first-person shooter) retro em 3D, inspirado em clássicos como *Doom*, desenvolvido em **JavaScript** com **Three.js**, diretamente no browser.

O objetivo é sobreviver e avançar através de **3 níveis**, enfrentando vários tipos de inimigos (mobs) ao longo do caminho, até chegar ao fim. O jogo tem **3 níveis de dificuldade** (Fácil, Normal e Difícil), permitindo ajustar o desafio consoante a experiência do jogador.

Inclui sistema de combate com várias armas, inimigos com comportamentos próprios, sistema de áudio, HUD e minimapa.

## Tecnologias

- **JavaScript**
- **Three.js** — motor de renderização 3D
- HTML / CSS

## Como correr o projeto

Como o jogo usa Three.js e carrega ficheiros externos (modelos, texturas), precisa de correr através de um **servidor local** — não funciona abrindo o `index.html` diretamente no browser (dá erros de CORS).

**Opção mais simples — extensão Live Server (VS Code):**
1. Instala a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code
2. Abre a pasta do projeto no VS Code
3. Clica com o botão direito no `index.html` → **"Open with Live Server"** (ou no botão "Go Live" na barra inferior)
4. O jogo abre automaticamente no browser

**Alternativa — linha de comandos:**
```bash
npx serve .
```
Depois abre o browser no endereço indicado (normalmente `http://localhost:3000`).

## Estrutura do projeto

```
src/
├── core/       # motor do jogo, níveis, estado global
├── mobs/       # inimigos e respetivos modelos/comportamentos
├── systems/    # combate, armas, inimigos, áudio, pickups, jogador
├── ui/         # HUD, minimapa, lore
└── main.js     # ponto de entrada do jogo
```

## O meu contributo (projeto de grupo)

Este foi um projeto desenvolvido em equipa. Os mobs e os níveis partilham uma **estrutura base comum** (definida em conjunto pela equipa), sendo depois cada elemento responsável por especializar/adaptar essa base às suas próprias partes. A minha contribuição foi:

- **Sistema de combate** (`systems/combat.js`)
- **Sistema de armas** (`systems/weapons.js`)
- Apoio no **motor do jogo** (`core/`), em conjunto com a equipa
- **Nível 2 completo** (`level2.js`, `level2Acid.js`) — construído a partir da estrutura base do jogo (semelhante a um labirinto, como os restantes níveis), com a adição de uma **piscina de ácido** como elemento próprio
- **Mob Imp** (`impModel.js`) — adaptado a partir da base comum dos mobs
- **Mob Summoner completo** (`summonerModel.js`, `summonerMob.js`) — adaptado a partir da base comum dos mobs
- **Mob Marine** — protótipo inicial desenvolvido em conjunto com a equipa, para definir a direção visual do jogo

O restante código (restantes sistemas, outros níveis, outros mobs) foi desenvolvido pelos restantes elementos da equipa.

## Créditos

Projeto realizado em grupo no âmbito da cadeira de Computação Gráfica.
