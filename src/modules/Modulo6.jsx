import React from 'react';

// b^k mod a = c;
// d^k mod a = x;

function Modulo6() {
  const [a, setA] = React.useState(null);
  const [b, setB] = React.useState(null);
  const [c, setC] = React.useState(null);
  const [d, setD] = React.useState(null);
  const [x, setX] = React.useState(null);

  const calculateModulo = React.useCallback((a, b, c, d) => {
    let k = 0;
    for (let i = 0; true; i++) {
      if (Math.pow(b, i) % a === c) {
        k = i;
        break;
      }
    }
    return Math.pow(d, k) % a;
  }, []);

  const handleChange = React.useCallback((e) => {
    const { name, value } = e.target;
    if (name === 'a') {
      setA(parseInt(value) || null);
      return;
    }
    if (name === 'b') {
      setB(parseInt(value) || null);
      return;
    }
    if (name === 'c') {
      setC(parseInt(value) || null);
      return;
    }
    if (name === 'd') {
      setD(parseInt(value) || null);
      return;
    }
  }, []);

  const handleReset = React.useCallback(() => {
    setA(null);
    setB(null);
    setC(null);
    setD(null);
    setX(null);
  }, []);

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      setX(calculateModulo(a, b, c, d));
    },
    [a, b, c, d]
  );

  return (
    <div>
      <h1>{`Modulo6`}</h1>
      <p>{`Xét Z∗(a) là một nhóm cyclic với (b) là một phần tử sinh. Hãy tính giá trị DH(b)(c,d) trong nhóm này.`}</p>
      <p>{`Giá trị nhập: a = ${a}, b = ${b}, c = ${c}, d = ${d}`}</p>
      <form onSubmit={handleSubmit}>
        <input
          name="a"
          type={`number`}
          placeholder="Giá trị của a = ?"
          value={a}
          onChange={handleChange}
          required
        />
        <input
          name="b"
          type={`number`}
          placeholder="Giá trị của b = ?"
          value={b}
          onChange={handleChange}
          required
        />
        <input
          name="c"
          type={`number`}
          placeholder="Giá trị của c = ?"
          value={c}
          onChange={handleChange}
          required
        />
        <input
          name="d"
          type={`number`}
          placeholder="Giá trị của d = ?"
          value={d}
          onChange={handleChange}
          required
        />
        <button type={`submit`}>{`Tính toán`}</button>
        <button
          type={`reset`}
          onClick={handleReset}
        >{`Đặt lại giá trị null`}</button>
      </form>
      <p>{`Gía trị DH(b)(c,d) = ${x}`}</p>
    </div>
  );
}

export default Modulo6;
