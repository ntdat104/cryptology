import React from 'react';

// sk=d=(a)
// pk=(p,g,g^d)=(b,c,d)
// m=e
// kE=f

// ElGamal digital signature
// sk = d = (67)
// pk = (p,g,g^d) = (97,23,15)
// m = 20
// kE = 35
// r = g^kE mod p
// s = (m - d*r) * kE^-1 mod (p-1)
// (40,20)

function Modulo8() {
  const [a, setA] = React.useState(null);
  const [b, setB] = React.useState(null);
  const [c, setC] = React.useState(null);
  const [d, setD] = React.useState(null);
  const [e, setE] = React.useState(null);
  const [f, setF] = React.useState(null);
  const [r, setR] = React.useState(null);
  const [s, setS] = React.useState(null);

  const calculateR = React.useCallback((c, f, b) => {
    const g = c;
    let tmp = g;
    let i = 1;
    while (i < f) {
      tmp = (tmp * g) % b;
      i++;
    }
    // c^f mod b
    return tmp;
  }, []);

  const calculateS = React.useCallback((e, a, r, f, b) => {
    // (e - a*r) * f^-1 mod (b-1)
    let tmp = e - a * r;
    while (tmp < 0) {
      tmp += b - 1;
    }
    for (let i = 0; true; i++) {
      if ((f * i) % (b - 1) === 1) {
        return (tmp * i) % (b - 1);
      }
    }
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
    if (name === 'e') {
      setE(parseInt(value) || null);
      return;
    }
    if (name === 'f') {
      setF(parseInt(value) || null);
      return;
    }
  }, []);

  const handleReset = React.useCallback(() => {
    setA(null);
    setB(null);
    setC(null);
    setD(null);
    setE(null);
    setF(null);
    setR(null);
    setS(null);
  }, []);

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      const r = calculateR(c, f, b);
      console.log('r', r);
      setR(r);
      setS(calculateS(e, a, r, f, b));
    },
    [a, b, c, d, e, f]
  );

  return (
    <div>
      <h1>{`Modulo8`}</h1>
      <p>{`Ta xem xét sơ đồ chữ ký ElGamal. Bạn có khoá bí mật của Bob sk=d=(a) và khoá công khai tương ứng pk=(p,g,gd)=(b,c,d). Hãy tính chữ ký Elgamal (r,s) cho thông điệp m=e và khoá tạm thời kE=f.`}</p>
      <p>{`Giá trị nhập: a = ${a}, b = ${b}, c = ${c}, d = ${d}, e = ${e}, f = ${f}`}</p>
      <form onSubmit={handleSubmit}>
        <input
          name="a"
          type={`number`}
          placeholder="Giá trị của a = ?"
          value={a}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <input
          name="b"
          type={`number`}
          placeholder="Giá trị của b = ?"
          value={b}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <input
          name="c"
          type={`number`}
          placeholder="Giá trị của c = ?"
          value={c}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <input
          name="d"
          type={`number`}
          placeholder="Giá trị của d = ?"
          value={d}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <input
          name="e"
          type={`number`}
          placeholder="Giá trị của e = ?"
          value={e}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <input
          name="f"
          type={`number`}
          placeholder="Giá trị của f = ?"
          value={f}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <button type={`submit`}>{`Tính toán`}</button>
        <button
          type={`reset`}
          onClick={handleReset}
        >{`Đặt lại giá trị null`}</button>
      </form>
      <p>{`Chữ ký (r,s) = (${r},${s})`}</p>
    </div>
  );
}

export default Modulo8;
