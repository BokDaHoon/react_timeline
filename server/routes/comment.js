import express from 'express';
import Memo from '../models/memo';
import mongoose from 'mongoose';

const router = express.Router();

/*
    WRITE COMMENT: POST /api/comment
    BODY SAMPLE: {
        commentMid: memo Id
        commentContent: "sample"
    }
    ERROR CODES
        1: NOT LOGGED IN
        2: EMPTY CONTENTS
*/
router.post('/',function(req,res) {
    console.log( "\x1b[93m" ,'/comment0: '+ JSON.stringify(req.body ,null, 4));
    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if(typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if(req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CREATE NEW MEMO
    //req.session.loginInfo.username
    let comment = {
        id: req.body.mId,
        writer: req.session.loginInfo.username,
        contents: req.body.contents
    };

    //console.log( "\x1b[93m" ,'/comment1: '+ JSON.stringify(comment ,null, 4));
    Memo.findOne({_id:comment.id}, function(err,rawContent) {
        if(err) throw err;
        console.log( "\x1b[93m" ,'/comment2: '+ JSON.stringify(rawContent ,null, 4));
        rawContent.comments.push({commentWriter:comment.writer, commentContents:comment.contents});
        rawContent.save(function(err) {
            if(err) throw err;
            console.log("save compelete");
            return res.json({ success: true });
        })
    })
});

/*
    Get COMMENT: POST /api/comment
    Params : memo id
    ERROR CODES
        1: NOT LOGGED IN
        2: EMPTY CONTENTS
*/
router.get('/:id', (req,res) =>{
    let id = req.params.id

    // CHECK MEMO ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    let objId = new mongoose.Types.ObjectId(req.params.id);

    Memo.findOne({ _id: objId })
    .exec((err, memo) => {
        if(err) throw err;
        console.log(objId);
        console.log( "\x1b[93m" ,'/memo: '+ JSON.stringify(memo ,null, 4));
        return res.json(memo);
    });
})



/*
    MODIFY COMMENT: PUT /api/comment/:id
    BODY SAMPLE: { contents: "sample "}
    ERROR CODES
        1: INVALID ID,
        2: EMPTY CONTENTS
        3: NOT LOGGED IN
*/
router.put('/:id', (req, res) => {

    // CHECK COMMENT ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if(typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if(req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 3
        });
    }

    // FIND COMMENT AND UPDATE
    Memo.findOneAndUpdate(
      {'comments._id': req.params.id},
      {$set: {'comments.$.commentContents': req.body.contents}}
    ).exec();

    return res.json({ success: true });
});

/*
    DELETE COMMENT: DELETE /api/comment/:id
    ERROR CODES
        1: INVALID ID
        2: NOT LOGGED IN
*/
router.delete('/:id', (req, res) => {
    // CHECK COMMENT ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    // FIND COMMENT AND DELETE
    Memo.findOneAndUpdate(
      {'comments._id': req.params.id},
      {$pull: {comments: {_id: req.params.id}}}
  ).exec((err) => {
      if(err) throw err;
      console.log("remove success");
      return res.json({ success: true });
  });
});

export default router;
