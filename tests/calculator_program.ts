import * as anchor from "@coral-xyz/anchor";
import {Program} from "@coral-xyz/anchor";
import {CalculatorProgram} from "../target/types/calculator_program";
import {assert} from "chai";
describe("calculator_program", () => { // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());
    const provider = anchor.getProvider();
    const program = anchor.workspace.CalculatorProgram as Program < CalculatorProgram >;
    const keyPair = anchor.web3.Keypair.generate();

    it("Is initialized!", async () => { // Add your test here.
        await program.methods.initialize().accounts({
          calculator: keyPair.publicKey, 
          signer: provider.publicKey, 
          systemProgram: anchor.web3.SystemProgram.programId}).signers([keyPair]).rpc();

        const result = await program.account.calculator.fetch(keyPair.publicKey);
        console.log("Initialized! ", result);

    });

    it("Should add!", async () => { // Add your test here.
      const num1 = new anchor.BN(5)
      const num2 = new anchor.BN(5)

      await program.methods.add(num1, num2).accounts({ calculator: keyPair.publicKey }).rpc();

      const result = await program.account.calculator.fetch(keyPair.publicKey);
      console.log("Add result: ", result.result);

      const sum = num1.add(num2)
      assert.ok(sum.eq(result.result));
    });

    it("Should Subtract!", async () => { // Add your test here.
      const num1 = new anchor.BN(5)
      const num2 = new anchor.BN(5)

      await program.methods.subtract(num1, num2).accounts({ calculator: keyPair.publicKey }).rpc();

      const result = await program.account.calculator.fetch(keyPair.publicKey);
      console.log("Add result: ", result.result);

      const difference = num1.sub(num2)
      assert.ok(difference.eq(result.result));
    });

    it("Should Multiply!", async () => { // Add your test here.
      const num1 = new anchor.BN(5)
      const num2 = new anchor.BN(5)

      await program.methods.multiply(num1, num2).accounts({ calculator: keyPair.publicKey }).rpc();

      const result = await program.account.calculator.fetch(keyPair.publicKey);
      console.log("Add result: ", result.result);

      const product = num1.mul(num2)
      assert.ok(product.eq(result.result));
    });

    it("Should Divide!", async () => { // Add your test here.
      const num1 = new anchor.BN(5)
      const num2 = new anchor.BN(5)

      await program.methods.divide(num1, num2).accounts({ calculator: keyPair.publicKey }).rpc();

      const result = await program.account.calculator.fetch(keyPair.publicKey);
      console.log("Add result: ", result.result);

      const quotient = num1.div(num2)
      const remainder = num1.mod(num2)
      assert.ok(quotient.eq(result.result));
      assert.ok(remainder.eq(result.remainder));
    });
});
