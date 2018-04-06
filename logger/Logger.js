export default class {
  constructor (name, level){
    this.name = name;
    this.level = level;
    this.logs = [];
    this.able = true;
  }
  /*
  Logger Class: require explanation?

  Each logg going to be added to a logs array like an object. This object contains data
  {date, type of log, msg of log}

  level 1 -> only errors
  level 2 -> errors and warns
  level 3 -> errors, warns and infos
  level 4 -> Errors, warns, infos and Logs
  */


  /* Method : Error -> Emit error in console
    @param: text -> text to show in console
  */

  error (text) {

    this.logs.push({
      date: this.getDate() +" / "+ this.getTime(),
      type: "error",
      msg: text
    });

    if (this.level >= 1 && this.able) console.error(this.getDate() + " / " + this.getTime() + " [Error]: "+ text);
  }

  /* Method : Warn -> Emit Warn in console
    @param: text -> text to show in console
  */

  warn (text) {

    this.logs.push({
      date: this.getDate() +" / "+ this.getTime(),
      type: "warn",
      msg: text
    });

    if (this.level >= 2 && this.able) console.warn(this.getDate() + " / " + this.getTime() + " [Warn]: " + text);
  }

  /* Method : Info -> Emit Info in console
    @param: text -> text to show in console
  */

  info (text) {

    this.logs.push({
      date: this.getDate() +" / "+ this.getTime(),
      type: "info",
      msg: text
    });

    if (this.level >= 3 && this.able) console.info(this.getDate() + " / " + this.getTime() + " [Info]: " + text);
  }

  /* Method : Log -> Emit Log in console
    @param: text -> text to show in console
  */

  log(text) {

    this.logs.push({
      date: this.getDate() +" / "+ this.getTime(),
      type: "log",
      msg: text
    });

    if (this.level >= 4 && this.able) console.log(this.getDate() + " / " + this.getTime() + " [Log]: " + text);
  }

  /* Method : getLogs -> Emit all logs types in console
  */

  getLogs() {
    this.logs.map((log)=>{
      console[log.type].call(null, log.msg);
    })
  }

  /* Method : Able -> Able logger
  */

  able() {
    this.able = true;
  }

  /* Method : Disable -> Disable logger
  */

  disable() {
    this.able = false;

  }


  /* Method : getTime -> Support method to get Time log
    @retun: current time execution
  */

  getTime() {
      var now = new Date();
      var hour = "0" + now.getHours();
      hour = hour.substring(hour.length-2);
      var minute = "0" + now.getMinutes();
      minute = minute.substring(minute.length-2);
      var second = "0" + now.getSeconds();
      second = second.substring(second.length-2);
      return hour + ":" + minute + ":" + second;
  };

  /* Method : getDate -> Support method to get date log
    @retun: current date execution
  */

  getDate(){
      var now = new Date();
      var year = "" + now.getFullYear();
      var month = "0" + (now.getMonth()+1);
      month = month.substring(month.length-2);
      var date = "0" + now.getDate();
      date = date.substring(date.length-2);
      return date + "-" + month + "-" + year;
  };

}
