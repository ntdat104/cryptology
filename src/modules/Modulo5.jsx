import React from 'react';

function Modulo5() {
  const [a, setA] = React.useState(null);
  const [b, setB] = React.useState(null);
  const [c, setC] = React.useState(null);
  const [x, setX] = React.useState(null);

  const calculateModulo = React.useCallback((a, b, c) => {
    // a^b mod c = x
    let tmp = a;
    let i = 1;
    while (i < b) {
      tmp = (tmp * a) % c;
      i++;
    }
    return tmp;
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
  }, []);

  const handleReset = React.useCallback(() => {
    setA(null);
    setB(null);
    setC(null);
    setX(null);
  }, []);

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      setX(calculateModulo(a, b, c));
    },
    [a, b, c]
  );

  return (
    <div>
      <h1>{`Modulo5`}</h1>
      <p>{`a^b mod c = x`}</p>
      <p>{`Giá trị nhập: a = ${a}, b = ${b}, c = ${c}`}</p>
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
        <button type={`submit`}>{`Tính toán`}</button>
        <button
          type={`reset`}
          onClick={handleReset}
        >{`Đặt lại giá trị null`}</button>
      </form>
      <p>{`Kết quả: x = ${x}`}</p>
    </div>
  );
}

export default Modulo5;
