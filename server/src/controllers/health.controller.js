export const getHealth = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'FitGen AI server is running',
  });
};