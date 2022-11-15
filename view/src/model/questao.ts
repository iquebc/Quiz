import { embaralhar } from "../functions/arrays";
import RespostaModel from "./resposta";

export default class QuestaoModel {
  constructor(
    id: number,
    enunciado: string,
    resposta: RespostaModel[],
    acertou = false
  ) {
    this.#id = id;
    this.#enunciado = enunciado;
    this.#respostas = resposta;
    this.#acertou = acertou;
  }

  #id: number;
  #enunciado: string;
  #respostas: RespostaModel[];
  #acertou: boolean;
  // #respondida:boolean;

  get id() {
    return this.#id;
  }

  get enunciado() {
    return this.#enunciado;
  }

  get respostas() {
    return this.#respostas;
  }

  get acertou() {
    return this.#acertou;
  }

  get naoRespondida() {
    return !this.respondida
}

  get respondida() {
    for (let resposta of this.#respostas) {
      if (resposta.revelada) return true;
    }

    return false;
  }

  responderCom(indice: number): QuestaoModel {
    const acertou = this.#respostas[indice]?.certa;
    const respostas = this.#respostas.map((resposta, i) => {
      const respostaSelecionada = indice === i;
      const deveRevelar = respostaSelecionada || resposta.certa;
      return deveRevelar ? resposta.revelar() : resposta;
    });
    return new QuestaoModel(this.id, this.enunciado, respostas, acertou);
  }

  embaralharRespostas() {
    let respostasEmbaralhadas = embaralhar(this.#respostas);
    return new QuestaoModel(
      this.#id,
      this.#enunciado,
      respostasEmbaralhadas,
      this.#acertou
    );
  }

  static criarUsandoObjeto(obj: QuestaoModel): QuestaoModel {
    const respostas = obj.respostas.map((resp) =>
      RespostaModel.criarUsandoObjeto(resp)
    );
    return new QuestaoModel(obj.id, obj.enunciado, respostas, obj.acertou);
  }

  converterParaObjeto() {
    return {
      id: this.#id,
      enunciado: this.#enunciado,
      respostas: this.#respostas.map((resposta) =>
        resposta.converterParaObjeto()
      ),
      respondida: this.respondida,
      acertou: this.#acertou,
    };
  }
}