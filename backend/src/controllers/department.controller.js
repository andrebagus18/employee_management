export const create = async (req, res) => {
  const { name } = req.body;

  if (name === undefined) {
    return res.status(400).json({
      msg: "Bad Request",
    });
  }

  return res.status(201).json({
    name: name,
  });
};
