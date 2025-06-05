# Theory: Norton's Theorem

## Introduction

Norton's Theorem is a fundamental principle used in the analysis of electrical circuits. It simplifies a complex linear electrical network into an equivalent circuit with a single current source and parallel resistance. This theorem is especially helpful in analyzing power systems and simplifying load calculations.



## Statement of Norton's Theorem

**"Any two-terminal linear network containing voltage sources and resistances can be replaced by an equivalent current source in parallel with a resistance."**

In simpler terms:
- The **Norton equivalent current (Iₛ𝒸)** is the current through a short circuit placed across the terminals.
- The **Norton equivalent resistance (Rₙ)** is the resistance measured across the terminals when all independent sources are replaced by their internal resistances (voltage sources shorted, current sources opened).



## Norton’s Equivalent Circuit

The original circuit is replaced by:
- A **current source (Iₛ𝒸)** in parallel with
- A **resistor (Rₙ)**

This combination behaves identically to the original network when viewed from the load terminals.



## Steps to Apply Norton’s Theorem

1. **Remove the Load Resistor (Rᴸ)** from the original circuit.
2. **Find the Norton Current (Iₛ𝒸)**:
   - Short the load terminals and calculate the current through the short (Iₛ𝒸).
3. **Find the Norton Resistance (Rₙ)**:
   - Deactivate all independent sources:
     - Replace voltage sources with short circuits.
     - Replace current sources with open circuits.
   - Find the equivalent resistance across the open load terminals (Rₙ).
4. **Draw the Norton Equivalent Circuit**:
   - Connect Iₛ𝒸 and Rₙ in parallel.
   - Reconnect the original load resistor Rᴸ across this parallel combination.
5. **Calculate Load Current (Iₗ)**:
   - Using the formula:
     \[
     Iₗ = Iₛ𝒸 \cdot \frac{Rᴸ}{Rₙ + Rᴸ}
     \]



## Applications of Norton’s Theorem

- Simplifies complex circuit analysis.
- Widely used in power system analysis.
- Helps in analyzing load sharing and current division.
- Useful in Thevenin-Norton transformations.



## Important Notes

- Applicable only to **linear bilateral networks**.
- Independent sources must be deactivated correctly when finding Rₙ.
- Norton’s Theorem is **dual** to Thevenin’s Theorem.



