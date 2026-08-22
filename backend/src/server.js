import app from "./app.js";
import router from "./routes/route.js";

const PORT = 5000;

app.use("/api/department", router);
app.use("/api/auth", router);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
