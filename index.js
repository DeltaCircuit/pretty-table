class PrettyTable {
  constructor(init) {
    this.table = init;
  }

  getColumns() {
    return Array.from(
      new Set(
        this.table.reduce((acl, curr) => acl.concat(Object.keys(curr)), [])
      )
    );
  }

  getPadConfig() {
    return this.getColumns().reduce(
      (acl, curr) =>
        Object.assign({}, acl, {
          [curr]: Math.max(
            curr.length,
            ...this.table.map(i => (i[curr] ? String(i[curr]).length : 0))
          )
        }),
      {}
    );
  }

  getHeader() {
    const t = this.getColumns().map(i => i.padEnd(this.getPadConfig()[i]));
    const lines = t.map(col => "═".repeat(col.length));
    return `╔${lines.join("╦")}╗\n║${t.join("║")}║\n╠${lines.join("╬")}╣`;
  }

  getBody() {
    const test = this.table.map(
      item =>
        `║${this.getColumns()
          .map(col => String(item[col] || "-").padEnd(this.getPadConfig()[col]))
          .join("║")}`
    );
    return `${test.join("║\n")}║`;
  }

  getFooter() {
    const t = this.getColumns().map(i => i.padEnd(this.getPadConfig()[i]));
    const lines = t.map(col => "═".repeat(col.length));
    return `╚${lines.join("╩")}╝`;
  }

  getTable() {
    return `${this.getHeader()}\n${this.getBody()}\n${this.getFooter()}`;
  }

  print() {
    // eslint-disable-next-line
    console.log(this.getTable());
  }
}

module.exports = PrettyTable;
