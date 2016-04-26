/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";
let express = require('express'),
    router = express.Router();
let categories = require('./controllers/categories');

router.route('/categories')
    .get(__.isAllow('list_category'), categories.list)
    .post(__.isAllow('create_category'), categories.create)
    .delete(__.isAllow('delete_category'), categories.delete);

router.route('/categories/:id')
    .post(__.isAllow('update_category'), categories.update);

module.exports = router;