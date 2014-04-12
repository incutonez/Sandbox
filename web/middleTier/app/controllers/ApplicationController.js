var Application = module.exports = function Application(init) {
  init.before(function protectFromForgery(ctl) {
    ctl.protectFromForgery('6204fe00799ef713e79d493fe9bffe33d33f5dad');
  });
};