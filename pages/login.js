import React from "react";
import Router from "next/router";
import web3 from "../utils/helper";
import { review, createUser, wallet } from "../ethereum/app";
import { inject } from "mobx-react";
import { runInAction } from "mobx";

@inject("store")
export default class Login extends React.Component {
  state = {
    account: ""
  };

  componentDidMount() {
    document.body.classList.add("bg-gradient-primary");
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     this.state.account &&
  //     this.state.account !== "" &&
  //     prevState.account !== this.state.account
  //   ) {
  //     web3.eth.getBalance(this.state.account).then(balance => {
  //       this.setState({ balance: web3.utils.fromWei(balance) });
  //     });
  //   }
  // }

  enableTorus = () => {
    window.ethereum.enable().then(accounts => {
      this.setState({ account: accounts[0] });
    });
    window.torus.login(true);
    Router.push("/dashboard");
  };

  importTorus = () => {
    import("@toruslabs/torus-embed").then(this.enableTorus);
  };

  componentWillUnmount() {
    document.body.classList.remove("bg-gradient-primary");
  }

  render() {
    const { user } = this.props.store;
    if (user.address !== "guesttoken") Router.replace("/dashboard");
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
                    <div className="input-group">
                      <input
                        className="bg-light form-control border-0 small"
                        type="text"
                        placeholder="ETH Address"
                        onChange={event => {
                          this.setState({ account: event.target.value });
                        }}
                        value={this.state.account}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary py-0"
                          type="button"
                          onClick={() => {
                            review
                              .getUser(this.state.account)
                              .then(response =>
                                runInAction(() => {
                                  user.address = this.state.account;
                                  user.details.name = response[0];
                                  user.details.fileCount = response[1];
                                  Router.replace("/dashboard");
                                })
                              )
                              .catch(e =>
                                console.log("*******************", e)
                              );
                            // if (console.log(createUser(this.state.email)))
                            //   Router.push("/dashboard");
                          }}
                        >
                          <i className="fas fa-envelope-square" />
                        </button>
                      </div>
                    </div>
                    <hr />
                    <h2 className="text-center">OR</h2>
                    <a
                      className="btn btn-primary btn-block text-white btn-facebook btn-user"
                      role="button"
                      onClick={() => Router.push("/dashboard")}
                    >
                      <i className="fab fa-facebook-f" />
                      &nbsp; Signin with Browser
                    </a>
                    <hr />
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
