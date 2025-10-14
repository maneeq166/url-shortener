import { Router } from "express";
import { urlSchema } from "../model/model.js";

const shortUrl = Router();

shortUrl.post("/shortUrl", async (req, res) => {
  try {
    const { fullUrl } = req.body;

    if (!fullUrl) {
      return res.status(400).json({ message: "Enter a valid URL" });
    }

    const urlfound = await urlSchema.findOne({ fullUrl });

    if (urlfound) {
      return res.status(200).json({
        message: "URL already converted",
        data: urlfound,
      });
    } else {
      const shortUrl = await urlSchema.create({ fullUrl });
      return res.status(201).json({
        message: "Short URL created",
        data: shortUrl,
      });
    }
  } catch (error) {
    res.send({ message: "something went wrong" });
    console.log(error);
  }
});
shortUrl.get("/shortUrl/:id", async (req, res) => {
  try {
    const shortUrl = await urlSchema.findOne({
      shortUrl: req.params.id,
    });
    
    if (!shortUrl) {
      res.status(404).json({ message: "Full Url not found" });
    } else {
      shortUrl.clicks++;
      shortUrl.save();
      res.status(200).redirect(`${shortUrl.fullUrl}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});
shortUrl.get("/shortUrl", async (req, res) => {
  try {
    const shortUrl = await urlSchema.find({}).sort({ createdAt: -1 });

    if (shortUrl.length > 0) {
      res.status(200).json(shortUrl);
    } else {
      res.status(404).json({ message: "Short Urls not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
shortUrl.delete("/shortUrl/:id", async (req, res) => {
  try {
    const shortUrl = await urlSchema.findByIdAndDelete({
      _id: req.params.id,
    });
    if (shortUrl) {
      res.status(200).json({ message: "Url successfully deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

export { shortUrl };
