import React from "react";
import web3 from "../utils/helper";

export default class Login extends React.Component {
  state = {
    account: "",
    balance: ""
  };

  componentDidMount() {
    console.log(web3);
    // if not using store
    setTimeout(() => {
      if (window.web3) {
        web3.eth.getAccounts().then(accounts => {
          this.setState({ account: accounts[0] });
        });
      }
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.account &&
      this.state.account !== "" &&
      prevState.account !== this.state.account
    ) {
      web3.eth.getBalance(this.state.account).then(balance => {
        this.setState({ balance: web3.utils.fromWei(balance) });
      });
    }
  }

  enableTorus = () => {
    window.ethereum.enable().then(accounts => {
      this.setState({ account: accounts[0] });
    });
  };

  importTorus = () => {
    import("@toruslabs/torus-embed").then(this.enableTorus);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center">
            <div className="card shadow-lg o-hidden border-0 my-5">
              <div className="card-body p-0">
                <div className="p-5">
                  <div className="text-center">
                    <h4 className="text-dark mb-4">Signin</h4>
                  </div>
                  <img src="./static/img/account.svg" width="100%" />
                  <br />

                  <form className="user">
                    <a
                      className="btn btn-primary btn-block text-white btn-google btn-user"
                      role="button"
                      onClick={this.importTorus}
                    >
                      <i className="fab fa-google" />
                      &nbsp; Signin with Google
                    </a>
                    <a
                      className="btn btn-primary btn-block text-white btn-facebook btn-user"
                      role="button"
                    >
                      <i className="fab fa-facebook-f" />
                      &nbsp; Signin with Facebook
                    </a>
                    <hr />
                    <div>Account: {this.state.account}</div>
                    <div>Balance: {this.state.balance}</div>
                  </form>
                  <div className="text-center">
                    <a className="small" href="/register">
                      Don't have an account? Signup!
                    </a>
                  </div>
                  <div className="text-center">
                    <a className="small" href="/">
                      Home
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
