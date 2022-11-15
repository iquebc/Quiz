import questoes from "../bancoDeQuestoes";

export default function handler(req, res) {
  const idSelecionado = +req.query.id;
  const questaoSelecionada = questoes.filter((x) => x.id === idSelecionado);
  if (questaoSelecionada.length === 1) {
    res
      .status(200)
      .json(questaoSelecionada[0].embaralharRespostas().converterParaObjeto());
  } else {
    res.status(204).send();
  }
}
