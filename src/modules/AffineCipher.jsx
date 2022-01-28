import React from "react";

function AffineCipher() {
  const [a, setA] = React.useState(null);
  const [b, setB] = React.useState(null);
  const [plaintext, setPlaintext] = React.useState(null);
  const [ciphertext, setCiphertext] = React.useState(null);

  const ALPHA = React.useMemo(
    () => [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
    []
  );

  const encrypt = React.useCallback(
    (a, b, word) => {
      if (!a || !b || !word) return;

      word = word.toUpperCase();
      let cipherText = "";

      for (let i = 0; i < word.length; i++) {
        if (word[i] === " ") {
          cipherText += " ";
          continue;
        }
        const alphaIndex = ALPHA.indexOf(word[i]);
        const troublesome = (a * alphaIndex + b) % ALPHA.length;

        cipherText += ALPHA[troublesome];
      }
      return cipherText;
    },
    [a, b]
  );

  const decrypt = React.useCallback(
    (a, b, word) => {
      if (!a || !b || !word) return;

      a %= ALPHA.length;
      word = word.toUpperCase();
      let plainText = "";

      for (let i = 0; i < word.length; i++) {
        let aInverse = 0;

        for (let j = 0; true; j++) {
          if ((a * j) % ALPHA.length == 1) {
            aInverse = j;
            break;
          }
        }

        if (word[i] === " ") {
          plainText += " ";
          continue;
        }

        const alphaIndex = ALPHA.indexOf(word[i]);

        let troublesome = (aInverse * (alphaIndex - b)) % ALPHA.length;
        if (troublesome < 0) troublesome += ALPHA.length;
        plainText += ALPHA[troublesome];
      }

      return plainText;
    },
    [a, b]
  );

  const handleChange = React.useCallback((e) => {
    const { name, value } = e.target;
    if (name === "a") {
      setA(parseInt(value) || null);
      return;
    }
    if (name === "b") {
      setB(parseInt(value) || null);
      return;
    }
  }, []);

  const handleChangePlaintext = React.useCallback(
    (e) => {
      const { value } = e.target;
      setPlaintext(value.toUpperCase());
      setCiphertext(encrypt(a, b, value));
    },
    [a, b]
  );

  const handleChangeCiphertext = React.useCallback(
    (e) => {
      const { value } = e.target;
      setCiphertext(value.toUpperCase());
      setPlaintext(decrypt(a, b, value));
    },
    [a, b]
  );

  return (
    <div>
      <h1>{`Affine Cipher`}</h1>
      <p>{`E(x)= a*x + b mod c.`}</p>
      <p>{`D(y) = a^(−1).(y − b) mod c.`}</p>
      <p>{`Key = (a, b).`}</p>
      <p>
        <input
          type={`number`}
          name="a"
          value={a}
          onChange={handleChange}
          placeholder="a = ?"
        />
        <input
          type={`number`}
          name="b"
          value={b}
          onChange={handleChange}
          placeholder="b = ?"
        />
      </p>
      <p>
        <textarea
          name="plaintext"
          type={`text`}
          placeholder="plaintext"
          value={plaintext}
          onChange={handleChangePlaintext}
          cols={50}
          rows={10}
        />
      </p>
      <p>
        <textarea
          name="ciphertext"
          type={`text`}
          placeholder="ciphertext"
          value={ciphertext}
          onChange={handleChangeCiphertext}
          cols={50}
          rows={10}
        />
      </p>
    </div>
  );
}

export default AffineCipher;
