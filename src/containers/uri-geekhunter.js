import React, { Component } from "react";
import { SyncLoader } from 'react-spinners';
import { CLIENT_ID, CLIENT_SECRET } from "../config/const";
import axios from "axios";

class URIGeekHunter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      result: '',
      language: '',
      feedbackMessage: '',
      feedbackStyle: 'alert-success',
      loading: true,
      feedback: false,
      loadingSolution: false,

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  handleChange(event) {
    this.setState({ code: event.target.value });
  }

  handleChangeLanguage(event) {
    this.setState({ language: event.target.value });
  }

  handleSubmit(event) {
    const { language, code } = this.state;
    let randValue =  2; //Math.floor((Math.random() * 100) + 1);
    event.preventDefault();

    if (language === '' || code === '') {
      alert('Selecione uma linguagem e codifique a solução para o problema antes de submeter.')
    } else {
      this.setState({ feedback: false, loadingSolution: true });

      var program = {
        stdin: randValue,
        script: this.state.code,
        language: this.state.language,
        versionIndex: "1",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET
      };

      axios({
        method: "POST",
        url: "https://cors-anywhere.herokuapp.com/https://api.jdoodle.com/v1/execute",
        headers: { 'Access-Control-Allow-Origin': '*' },
        data: program
      }).then(success => {       
        let result = (randValue*randValue*3.14159).toFixed(4);
        
        // eslint-disable-next-line
        if(result == parseFloat(success.data.output)) {        
          this.setState({
            feedback: true,
            feedbackStyle: 'alert-success',
            feedbackMessage: "Solução proposta aceita!",
            loadingSolution: false
          });
        } else {
          this.setState({
            feedback: true,
            feedbackStyle: 'alert-danger',
            feedbackMessage: "Solução proposta não foi aceita!",
            loadingSolution: false
          });
        }
      }).catch(error => {
        console.log({ error });

        this.setState({
          feedback: true,
          feedbackStyle: 'alert-danger',
          feedbackMessage: "Houve um erro na sua solicitação, tente novamente mais tarde.",
          loadingSolution: false
        });
      });
    }


  }

  renderFeedback() {
    if (this.state.feedback) {
      return (
        <div className="animated fadeIn">
          <div className={`alert ${this.state.feedbackStyle}`} role="alert">
            {this.state.feedbackMessage}
          </div>
        </div>

      )
    }
  }

  renderSolutionLoading() {
    if (this.state.loadingSolution) {
      return (
        <div className="animated fadeIn flex-center padding-10">
          <SyncLoader
            size={10}
            sizeUnit={"px"}
            color={'#494949'}
          />
        </div>
      );
    }
  }

  render() {
    const { language, code } = this.state;

    let btnStyle = 'btn-disabled';

    if (language !== '' && code !== '') {
      btnStyle = '';
    }

    if (this.state.loading) {
      return (
        <div className="container vh-100">
          <div className="flex-center vh-100">
            <SyncLoader
              size={15}
              sizeUnit={"px"}
              color={'#494949'}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="container animated fadeIn">
        <div className="jumbotron margin-top-40">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="text-center">URI Geekhunter</h3>
              <p className="text-14 margin-top-20">
                Solucione o problema abaixo com uma linguagem de programação de
                sua escolha. Leia as intruções do problema com calma, verifique
                os exemplos de entrada e saída, codifique a solução do problema
                proposto e finalmente envie sua solução para a checagem.
              </p>
              <hr />
              <p className="text-16 text-bold text-center">Área do Círculo</p>
              <p className="text-12 text-center">
                Adaptado por Neilor Tonin, URI Brasil
              </p>
              <p className="text-12 text-center">Timelimit: 1</p>

              <p className="text-14 text-bold text-uppercase">Instruções</p>
              <p className="text-14 margin-top-20">
                A fórmula para calcular a área de uma circunferência é: area = π
                . raio2. Considerando para este problema que π = 3.14159: Efetue
                o cálculo da área, elevando o valor de raio ao quadrado e
                multiplicando por π.
              </p>
              <hr />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <p className="text-14 text-bold text-uppercase">Entrada</p>
              <p className="text-14">
                A entrada contém um valor de ponto flutuante (dupla precisão),
                no caso, a variável raio.
              </p>
            </div>
            <div className="col-lg-6">
              <p className="text-14 text-bold text-uppercase">Saída</p>
              <p className="text-14">
                Apresentar o resultado da area conforme exemplo abaixo, com 4 casas após o ponto decimal.
                Utilize variáveis de dupla precisão (double). Como todos os
                problemas, não esqueça de imprimir o fim de linha após o
                resultado, caso contrário, você receberá "Presentation Error".
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <table className="table table-striped table-dark margin-top-20">
                <thead>
                  <tr>
                    <th className="text-14">Exemplo de entrada</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2.00</td>
                  </tr>
                  <tr>
                    <td>100.64</td>
                  </tr>
                  <tr>
                    <td>150.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-lg-6">
              <table className="table table-striped table-dark margin-top-20">
                <thead>
                  <tr>
                    <th className="text-14">Exemplo de saída</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>12.5664</td>
                  </tr>
                  <tr>
                    <td>31819.3103</td>
                  </tr>
                  <tr>
                    <td>70685.7750</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col-lg-6">
              <p className="text-14 text-bold text-uppercase">Problema</p>
              <input
                className="form-control"
                type="text"
                value="1002"
                disabled
              />
            </div>
            <div className="col-lg-6">
              <p className="text-14 text-bold text-uppercase">Linguagem</p>
              <select value={this.state.language} onChange={this.handleChangeLanguage} className="custom-select">
                <option>Escolha uma linguagem...</option>
                <option value="cpp">C++</option>
                <option value="python3">Python3</option>
              </select>
            </div>
            <div className="col-lg-12 margin-top-20">
              {this.renderFeedback()}
              {this.renderSolutionLoading()}
              <p className="text-14 text-bold text-uppercase">Código fonte</p>
              <form onSubmit={this.handleSubmit}>
                <textarea placeholder={"Codifique a solução proposta..."} value={this.state.code} onChange={this.handleChange} className="margin-top-10 code-editor" />
                <div className="row margin-top-10">
                  <div className="col-lg-9" />
                  <div className="col-lg-3">
                    <input
                      type="submit"
                      value="Submeter"
                      className={`btn btn-block ${btnStyle}`}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default URIGeekHunter;
