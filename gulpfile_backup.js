'use strict';

var path = require('path'),
    fs = require('fs'),
    pkg = JSON.parse(fs.readFileSync('./package.json'));

var glob = require('glob');


var gulp = require('gulp'),
    prefix = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    sftp = require('gulp-sftp'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache-file'),
    connect = require('gulp-connect'),
    filelogs = require('gulp-filelogs'),
    gulpIgnore = require('gulp-ignore'),
    connect = require('gulp-connect');

var moment = require('moment');

var production = false;

var vendorVersion = [
    "ios_saf >= 5.0",
    "ie_mob >= 8"
];

//css编译
gulp.task('css', function() {

    return gulp.src(['src/**/*.css'])
        .pipe(prefix(vendorVersion))
        .pipe(gulp.dest('build'));
});



gulp.task('less', function() {
    return gulp.src(['src/**/*.less'])
        .pipe(less()) 
        .pipe(prefix(vendorVersion))
        .pipe(gulp.dest('build'));
});

// 配置json文件
gulp.task('configjs', function() {
    var componentsFolders = glob.sync('src/js/pages/*/');
    componentsFolders.forEach(function(folder) {

        var config = fs.readFileSync(folder + 'config.json', 'utf-8');
        config = JSON.parse(config);
        var dependencies = config.dependencies;

        // 静态变量 unshift始终在array前面添加
        dependencies.unshift('src/js/commonjs/contants.js');
        //强制增加依赖
        dependencies.unshift('src/js/mods/common/globalconfig.js');
        // 强制增加依赖ajax
        dependencies.unshift('src/js/commonjs/fruitAjax.js');
        // 共通方法
        dependencies.unshift('src/js/commonjs/baseFunc.js');
        // // jquery   打包顺序倒这来  暂时不能引入jquery
        // dependencies.unshift('src/plugin/jquery/jquery.min.js');

        // 拿到
        var componentName = folder.match(/.+\/(.+)\/$/)[1];
        console.log('componentName:'+componentName+',dependencies:'+dependencies);
        gulp.src(dependencies)
            .pipe(concat(componentName + ".main.js"))
            //.pipe(uglify())
            .pipe(gulp.dest('build/js/pages/' + componentName));
    });
});

gulp.task('libjs', function() {
    // lib已经删除掉了
    // gulp.src('src/js/lib/**/*')
    //     // .pipe(concat(componentName + ".main.js"))
    //     .pipe(gulp.dest('build/js/lib/'));
    gulp.src('src/plugin/**/*')
        // .pipe(concat(componentName + ".main.js"))
        .pipe(gulp.dest('build/plugin/'));
});

// 打包类库文件
gulp.task('combojs', function() {
    var comboFolders = [
        'src/js/lib/handlebars/handlebars.runtime.min.js',
        'src/js/lib/devbridge-autocomplete/dist/jquery.autocomplete.min.js',
        'src/js/lib/jquery-modal/jquery.modal.min.js',
        'src/js/lib/es5-shim/es5-shim.min.js'
    ];
    var combosName = '';
    /*comboFolders.forEach(function(folder) {
    var comboName = folder.match(/[^\/]+$/)[0];
	console.log(comboName);
	combosName = combosName + '~' + comboName;
  });*/
    gulp.src(comboFolders)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('build/js/lib'));
})


//gulp.task('templates', function() {
//    var componentsFolders = glob.sync('src/js/pages/*/');
//    componentsFolders.forEach(function(folder) {
//        var componentName = folder.match(/.+\/(.+)\/$/)[1];
//        gulp.src([folder + "templates/" + '*.hbs'])
//            .pipe(handlebars())
//            .pipe(wrap('Handlebars.template(<%= contents %>)'))
//            .pipe(declare({
//                namespace: 'TPL.' + componentName,
//                noRedeclare: true, // Avoid duplicate declarations
//            }))
//            .pipe(concat(componentName + ".tpl.js"))
//            .pipe(gulp.dest('build/js/pages/' + componentName));
//    });
//});

//gulp.task('templates-dev', function() {
//    var componentsFolders = glob.sync('src/js/mods/*/');
//    componentsFolders.forEach(function(folder) {
//        var componentName = folder.match(/.+\/(.+)\/$/)[1];
//        gulp.src([folder + '*.hbs'])
//            .pipe(handlebars())
//            .pipe(wrap('Handlebars.template(<%= contents %>)'))
//            .pipe(declare({
//                namespace: 'TPL.' + componentName,
//                noRedeclare: true, // Avoid duplicate declarations
//            }))
//            .pipe(concat(componentName + ".tpl.js"))
//            .pipe(gulp.dest('src/js/mods/' + componentName));
//    });
//
//});

gulp.task('assets', function() {
    gulp.src('src/assets/**/*')
        //.pipe(concat(componentName + ".main.js"))
        .pipe(gulp.dest('build/assets/'));
});


var deploy = require('./deploy.config.js');
var productionDeploy = require("./production.config.js");
var GlobalTimeStamp;



/**  Index deploy task
 * @param {varType} index Description
 * @param {varType} alpha Description
 * @param {varType} function Description
 * @return {void} description
 */
gulp.task('index-alpha', function() {

    return gulp.src(['build/**/*',
            'build/js/lib/**/*',
            'build/assets/img/**/*'
        ])
        .pipe(cache())
        .pipe(gulpIgnore.exclude({
            isFile: false
        }))
        .pipe(filelogs())
        .pipe(sftp(deploy.alpha));

});

gulp.task('index-beta', function() {
    return gulp.src(['build/**/*',
            '!build/js/lib/**/*',
            'build/assets/img/**/*'
        ])
        .pipe(cache())
        .pipe(gulpIgnore.exclude({
            isFile: false
        }))
        .pipe(filelogs())
        .pipe(sftp(deploy.beta));
});


gulp.task('stampBuild', function() {
    var deleteFolderRecursive = function(path) {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function(file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };
    deleteFolderRecursive('./publish');
    return gulp.src(['build/**/*'])
        .pipe(gulp.dest('publish/' + GlobalTimeStamp));
});

gulp.task('index-production', ['stampBuild'], function() {
    console.info('remote:' + productionDeploy.production.remotePath);
    console.log('src:' + GlobalTimeStamp + '/build/**/*');
    return gulp.src('publish/**/*')
        .pipe(gulpIgnore.exclude({
            isFile: false
        }))
        .pipe(filelogs())
        .pipe(sftp(productionDeploy.production))

});


/** Gobal deploy task
 * @param {varType} deploy Description
 * @param {varType} alpha Description
 * @param {varType} default Description
 * @param {varType} function Description
 * @return {void} description
 */
gulp.task('deploy-alpha', ['default'], function() {
    production = false;
    gulp.start('index-alpha');
});

gulp.task('deploy-beta', ['default'], function() {
    production = false;
    gulp.start('index-beta');
});

gulp.task('deploy-production', ['default'], function() {

    GlobalTimeStamp = moment().format("YYYYMMDDHMS");
    console.info(GlobalTimeStamp);
    production = true;
    gulp.start('index-production');
    //gulp.start('account-production');
});

// 打包命令
gulp.task('default', [
    // 'combojs',
    //'templates',
    // 'less',
//    'templates-dev',
    'assets',
    'libjs',
    'configjs'
]);

gulp.task('dev', ['default'], function() {
    connect.server({
        root: ''
    });
    gulp.watch([
        'src/**/*.css'
    ], ['assets']);

    gulp.watch([
        'src/**/*.less'
    ], ['less']);

    gulp.watch([
        'src/**/*.js'
    ], ['configjs']);

    gulp.watch([
        'src/js/pages/**/*.hbs'
    ], ['templates']);

    gulp.watch([
        'src/js/mods/**/*.hbs'
    ], ['templates-dev']);
});
