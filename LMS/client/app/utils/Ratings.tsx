import React, { FC, useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

const Ratings: FC<Props> = ({ value, onChange }) => {
  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Rating
        value={value}
        onChange={handleRatingChange}
        precision={0.5}
      />
      <Typography variant="body2" className="text-black dark:text-white">
        {value} / 5
      </Typography>
    </Stack>
  );
};

export default Ratings;