Verification of Norton's Theorem Procedure
This document outlines the step-by-step procedure to verify Norton's Theorem using a simulated circuit setup. Follow the instructions carefully to obtain accurate results.
Prerequisites

Ensure JavaScript is enabled in your browser for simulation functionality.
Set all resistors (R₁, R₂, R₃, and Rᴸ) to values close to their maximum.
Select appropriate values for voltage sources V₁ and V₂ (e.g., V₁ = 220 V, V₂ = 110 V).
Note: All resistances are in ohms (Ω), currents in amperes (A), and voltages in volts (V).

Procedure
Step 1: Case 1 – Measure Load Current (Iₗ)

Configure the circuit:
Set switch S₁ to Power.
Set switch S₂ to Load.


Input the resistor values (e.g., R₁ = 100 Ω, R₂ = 150 Ω, R₃ = 200 Ω, Rᴸ = 250 Ω) and voltage sources (V₁, V₂).
Click Simulate to run the simulation.
Record the Load Current (Iₗ) displayed on Meter A1.
Record the Load Voltage (Vₗ) displayed on Meter MC.
Calculate the Load Resistance (Rᴸ) using the formula:Rᴸ = Vₗ / Iₗ
Add the results to the Observation Table under Case 1.

Step 2: Case 2a – Find Norton Short Circuit Current (Iₛ𝒸)

Configure the circuit:
Set switch S₁ to Power.
Set switch S₂ to Short.


Ensure the same resistor and voltage values as in Case 1.
Click Simulate to run the simulation.
Record the Norton Short Circuit Current (Iₛ𝒸) displayed on Meter A1.
Add the result to the Observation Table under Case 2a.

Step 3: Case 2b – Find Norton Resistance (Rₙ)

Configure the circuit:
Set switch S₁ to Short.
Set switch S₂ to Power.


Ensure the same resistor values as in Case 1 (voltage sources are deactivated for this step).
Click Simulate to run the simulation.
Record the 2nd Voltage Source (V) displayed on Meter MC.
Record the Ammeter Reading (I) displayed on Meter A1.
Calculate the Norton Resistance (Rₙ) using the formula:Rₙ = V / I
Add the results to the Observation Table under Case 2b.

Step 4: Case 3 – Calculate Load Current Using Norton’s Theorem

Navigate to the Case 3 tab in the simulation interface.
Use the recorded values of Iₛ𝒸 (from Case 2a) and Rₙ (from Case 2b).
Calculate the Load Current (Iₗ) using the formula:Iₗ = Iₛ𝒸 × (Rᴸ / (Rₙ + Rᴸ))
Compare the calculated Iₗ with the measured Iₗ from Case 1 to verify Norton’s Theorem.
Add the calculated Iₗ to the Observation Table under Case 3.

Step 5: Record and Verify Results

Repeat the above steps for multiple observations (e.g., 5 sets) by varying resistor or voltage values if needed.
Fill the Observation Table with the following columns for each observation:
Serial no. of Observation
Load Current (Iₗ) from Case 1
Load Voltage (Vₗ) from Case 1
Load Resistance (Rᴸ = Vₗ / Iₗ)
Norton Current (Iₛ𝒸) from Case 2a
2nd Voltage Source (V) from Case 2b
Ammeter Reading (I) from Case 2b
Norton Resistance (Rₙ = V / I)
Calculated Load Current (Iₗ) from Case 3


Verify Norton’s Theorem by ensuring the calculated Iₗ (Case 3) matches the measured Iₗ (Case 1) within acceptable error margins.
Click Add to Observation Table after each simulation to store results.
Optionally, click Print to generate a hard copy of the results.

Notes

MC refers to the Moving Coil meter used for voltage measurements.
DPDT refers to Double Pole Double Throw switches (S₁ and S₂).
Ensure all measurements are recorded in the correct units (A for currents, V for voltages, Ω for resistances).
If simulation results are not displayed, check switch settings and ensure the circuit is properly configured.

