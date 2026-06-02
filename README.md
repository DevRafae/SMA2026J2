# SMA 2026 - Jogo de Ligação

Este é um jogo interativo de associação de colunas desenvolvido para a campanha **SMA 2026**, com o tema: *"Óleo de Cozinha: Do descarte correto à economia circular na prática"*.

O objetivo da dinâmica é conscientizar os participantes sobre os impactos ambientais do descarte incorreto do óleo residencial e apresentar as soluções sustentáveis através da economia circular.

## 🚀 Funcionalidades

- **Mecânica de Conexão Nativa**: O usuário clica em um conceito da esquerda (origem) e na resposta correspondente à direita (destino).
- **Validação com Feedback Visual**: 
  - **Acerto**: Uma linha verde permanente é desenhada entre os blocos, e o contorno das caixas fica verde (`correct`).
  - **Erro**: Os blocos ganham contorno vermelho (`incorrect`) e piscam com um efeito visual de tremor (shake). A linha não é mantida, permitindo nova tentativa.
- **Cronômetro Integrado**: Um timer inicia automaticamente na inicialização da página para medir o tempo que o participante leva para concluir o desafio.
- **Tela de Finalização (Modal)**: Ao acertar as 6 combinações, um pop-up parabeniza o usuário, exibe o tempo final de resolução e o instrui a clicar no botão externo de conclusão.
- **Otimizado para iFrame**: O design foi projetado para ser responsivo e rodar perfeitamente embutido dentro de outras páginas ou portais corporativos.

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estruturação dos blocos e elementos da interface.
- **CSS3**: Estilização moderna, variáveis globais, responsividade e animações de feedback (shake).
- **JavaScript (Vanilla)**: Lógica do jogo, controle do cronômetro e manipulação do elemento `<canvas>` para desenho dinâmico e preciso das linhas de conexão.

## 📁 Estrutura do Repositório

```text
├── index.html     # Estrutura HTML e conteúdo dos textos
├── style.css      # Estilização visual, cores e efeitos das caixas
└── script.js      # Inteligência do jogo, cálculo do canvas e timer
