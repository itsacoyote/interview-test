# Instructions

1. Get the list of coins from `/api/coins`.
  - Just display the first 50.
  - Only coins that have `ethereum` in `platforms`.

2. Use the input field to filter the list of coins,
  filter and search for the `coin.name`, and symbol if you want.

3. Add a button to the row to open the modal for that coin.
  - Use the `coin.id` to pull data from `/api/coin/[id]`
    to display in the modal.