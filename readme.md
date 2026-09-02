# Portfólio Profissional

Website de portfólio profissional responsivo, desenvolvido para a disciplina de Laboratório de Desenvolvimento de Software da PUC Minas.

## Integrantes

- Caio César Falinacio dos Santos
- Luiz Fernando Cunha Maia
- Pedro Henrique Nogueira Ferreira

## Link
- Figma:
https://www.figma.com/design/1i61MIS88bMN12Y7ml8MCD/Untitled?node-id=0-1&p=f

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Lucide Icons
- Vercel (hospedagem prevista)
- Figma (prototipagem)

## Estrutura de diretórios

```text
LABORATORIO-PORT/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │   └── projects/
│   └── js/
│       ├── main.js
│       └── profile-access.js
├── tests/
│   └── profile-access.test.mjs
├── image.png
├── image-1.png
├── image-2.png
├── image-3.png
├── index.html
└── readme.md
```

As pastas `assets/images/` e `assets/images/projects/` estão preparadas para receber, respectivamente, a foto de perfil e as capturas dos projetos.

## Executando localmente

Abra o arquivo `index.html` no navegador ou use uma extensão de servidor local, como Live Server.

## Personalização de acesso

Na primeira visita, o usuário escolhe entre os perfis Recrutador, Professor e Visitante. A escolha fica salva apenas no navegador por meio de `localStorage`, permanece após fechar a aba ou o navegador e pode ser alterada pelo botão de perfil no cabeçalho.

Os perfis reorganizam discretamente projetos e experiências, sem ocultar conteúdo nem funcionar como autenticação para dados sensíveis.

### Objetivo dos níveis de acesso

Os níveis de acesso existem para adaptar a ordem e o destaque das informações ao interesse de cada público. Todos os perfis podem consultar o mesmo conteúdo; o que muda é a prioridade visual dada a projetos, experiências e formação.

#### Recrutador

O perfil Recrutador prioriza experiências profissionais, projetos com aplicação prática, resultados, competências e formas de contato. Esse público normalmente precisa identificar rapidamente se o profissional possui conhecimentos e experiências compatíveis com uma oportunidade.

#### Professor

O perfil Professor prioriza formação acadêmica, monitoria, fundamentos técnicos, projetos desenvolvidos durante o curso e evolução do estudante. Essa organização facilita a avaliação do aprendizado, da participação acadêmica e da aplicação dos conhecimentos estudados.

#### Visitante

O perfil Visitante mantém uma visão geral e equilibrada do portfólio. Ele é indicado para pessoas que não possuem um objetivo profissional ou acadêmico específico e desejam conhecer a trajetória, os projetos e os contatos do desenvolvedor.

### Diferenças entre os perfis

- O Recrutador recebe primeiro os conteúdos com maior relevância profissional.
- O Professor recebe primeiro os conteúdos com maior relevância acadêmica.
- O Visitante recebe a organização geral originalmente definida para o portfólio.

As diferenças são intencionalmente discretas. A identidade visual, os textos, os links e as informações disponíveis permanecem os mesmos. Apenas a ordem dos conteúdos, a mensagem de contexto e alguns destaques visuais são adaptados.

### Importância da separação

A separação reduz o tempo necessário para cada público encontrar as informações mais relevantes. Em vez de criar versões diferentes do portfólio ou duplicar conteúdo, o sistema reutiliza os mesmos dados e modifica somente sua apresentação. Isso mantém o projeto consistente, facilita a manutenção e oferece uma experiência mais direcionada.

Essa personalização não representa autenticação ou autorização de segurança. Como a preferência é armazenada em `localStorage`, nenhum dos níveis deve ser usado para proteger documentos, credenciais ou informações sensíveis.

Para executar os testes:

```bash
node --test
```

## WIREFRAMES

![w1](image.png)

Nesse wireframe nos temos a vizao inicla do portifolio,um icone com as inicias que eu coloquei como nome do sistema,o nome,cidade e uma breve descrição alem disso,temos um header mostrando todas as telas desse portifolio e tambem a tradução para o ingles

![alt text](image-1.png)

Nesse wireframe temos os projetos,cards com as especificações de cada projeto,nome,descriçaõ,imagem e o valor que ele gera,para melhorar o caminahemnto pelo site tambem temos um "side - bar" que deixe o sistema mais armonico e condiz com a sua identidade vizual

![alt text](image-2.png)

Agora na parte de experiencias temos o que seriam cursos fora da faculdade ate mesmo alguns itens que estão em projetos serve para essa area,enfim nessa parte nos temos tambem uma breve descriçaõ sobre cada projeto realizado

![alt text](image-3.png)

Por ultimos nos temos a parte de links e contato do portifolio,onde o usuario consegue ter acesso direto ao contato do estudante e alguns links que achei util como repositorios,postagem me linkedin etcc......Também temos um rodape com preservaçaõ de direito e o nome da minha instituição PUC Minas e a disciplina que é Laboratório de Desenvolvimento de Software
