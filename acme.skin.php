<?php 
    if(!defined('MEDIAWIKI')) {
        die(-1);
    }

    class SkinAcme extends SkinTemplate {
        public $skinname = 'acme';
        public $stylename = 'acme';
        public $template = 'AcmeTemplate';
        public $useHeadElement = true;

        public function initPage(OutputPage $out) {
            parent::initPage($out);
            $out -> addModuleScripts('skins.acme');
            $out -> addMeta('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
        }

        public function setupSkinUserCss(OutputPage $out) {
            global $wgSiteCSS;
            parent::setupSkinUserCss($out);
            $out -> addModules('skins.acme');

            $out -> addStyle('acme/css/font-awesome/css/font-awesome.min.css');

            $out -> addStyle('acme/css/bootstrap.min.css');
            $out -> addStyle('acme/css/style.css');
            $out -> addStyle('acme/css/style-responsive.css');

            $out -> addScript('<script
                                        src="https://code.jquery.com/jquery-1.12.4.js"
                                        integrity="sha256-Qw82+bXyGq6MydymqBxNPYTaUXXq7c8v3CwiYwLLNXU="
                                        crossorigin="anonymous"></script>'
            );
            $out -> addScript('<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>');
        }
    }

    class AcmeTemplate extends BaseTemplate {
        public $skin;
        public function execute() {
            global $wgRequest, $wgUser, $wgSitename, $wgSitenameshort, $wgCopyrightLink, $wgCopyright, $wgBootstrap, $wgArticlePath, $wgGoogleAnalyticsID, $wgSiteCSS;
            global $wgEnableUploads;
            global $wgLogo;
            global $wgTOCLocation;
            global $wgNavBarClasses;
            global $wgSubnavBarClasses;

            $this -> skin = $this -> data['skin'];
            
            $url_prefix = str_replace('$1', '', $wgArticlePath);

            $action = $wgRequest -> getText('action');
            $revid = $this -> getSkin() -> getRequest() -> getText('oldid');

            $_TITLE = $this -> getSkin() -> getRelevantTitle();
            $_URITITLE = rawurlencode($_TITLE);

            wfSuppressWarnings();

            $this -> html('headelement');
?>
            <header class="head-section">
                <div class="navbar navbar-default navbar-static-top container">
                    <div class="navbar-header">
                        <button class="navbar-toggle" data-target=".navbar-collapse" data-toggle="collapse" type="button">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span></button>
                            <a class="navbar-brand" href="<?php echo $this -> data['nav_urls']['mainpage']['href']; ?>">
                                <img src="<?php echo $wgLogo; ?>" style="width: 200px; height: 100px;">
                            </a>
                    </div>
                    <div class="navbar-collapse collapse">
                        <ul class="nav navbar-nav">
                            <li id="right-search">
                                <form action="<?php $this -> text('wgScript') ?>" id="searchform" role="search">
                                    <input class="form-control search" type="search" name="search" placeholder="Search" id="searchInput" autocomplete="off">
                                    <input type="hidden" name="title" value="특수:검색">
                                </form>                
                            </li>
                            <li>
                                <?php echo Linker::linkKnown(SpecialPage::getTitleFor('RecentChanges', null), '<i class="fa fa-refresh" aria-hidden="true"></i>  <span id="mobile">바뀐 문서<span>'); ?>
                            </li>
                            <li>
                                <?php echo Linker::linkKnown(SpecialPage::getTitleFor('Random', null), '<i class="fa fa-random" aria-hidden="true"></i> <span id="mobile">랜덤</span>'); ?>
                            </li>
<?php 
                            $theMsg = 'toolbox';
                            $theData = array_reverse($this -> getToolbox());
    ?>
                            <li class="dropdown show">
                                <a class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="javascript:void(0);">
                                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                    <span id="mobile">도구</span>
                                    <i class="fa fa-angle-down"></i>
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li>
                                        <a href="<?php echo $url_prefix; ?>특수:필요한문서">
                                            <i class="fa fa-bell" aria-hidden="true"></i>
                                            작성 필요
                                        </a>
                                    </li>
                                    <li>
                                        <a href="<?php echo $url_prefix; ?>특수:짧은문서">
                                            <i class="fa fa-puzzle-piece" aria-hidden="true"></i>
                                            짧은 문서
                                        </a>
                                    </li>
                                    <li>
                                        <a href="<?php echo $url_prefix; ?>특수:올리기">
                                            <i class="fa fa-upload" aria-hidden="true"></i>
                                            파일 올리기
                                        </a>
                                    </li>
                                    <li>
                                        <a href="<?php echo $url_prefix; ?>특수:가리키는문서/<?php echo $$_URITITLE; ?>">
                                            <i class="fa fa-repeat" aria-hidden="true"></i>
                                            역링크
                                        </a>
                                    </li>
                                    <li>
                                        <?php echo Linker::linkKnown(SpecialPage::getTitleFor('특수문서', null), '<i class="fa fa-cog" aria-hidden="true"></i> 특수 문서', array('title' => '특수 문서')); ?>
                                    </li>
                                </li>
                            </ul>
<?php 
                            if($wgUser -> isLoggedIn()) {                    
                                function loginBox() {
                                    global $wgUser, $wgRequest;
                                }

                                $email = trim($wgUser -> getEmail());
                                $email = strtolower($email);
                                $email = md5($email)."?d=identicon"; 

?>
                                <li class="dropdown show">
                                    <a href="javascript:void(0);" class="btn btn-secondary dropdown-toggle" id="login-menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <?php echo '<img style="width: 32px;" class="profile-img" src="https://secure.gravatar.com/avatar/'.$email.'" /></a>'; ?>
                                    </a>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <li>
                                            <?php echo Linker::linkKnown(Title::makeTitle(NS_USER, $wgUser -> getName()), '<i class="fa fa-user" aria-hidden="true"></i>  '.$wgUser -> getName(), array('title' => '사용자 문서를 보여줍니다.')); ?>
                                        </li>
                                        <li>
                                            <?php echo Linker::linkKnown(SpecialPage::getTitleFor('preferences', null), '<i class="fa fa-cog" aria-hidden="true"></i>  환경 설정', array('title' => '환경 설정을 불러옵니다.')); ?>
                                        </li>
                                        <li>
                                            <?php echo Linker::linkKnown(SpecialPage::getTitleFor('watchlist', null), '<i class="fa fa-bookmark" aria-hidden="true"></i>  주시 문서', array('title' => '주시문서를 불러옵니다.')); ?>
                                        </li>
                                        <li>
                                            <?php echo Linker::linkKnown(SpecialPage::getTitleFor('Contributions', $wgUser -> getName()), '<i class="fa fa-pencil" aria-hidden="true"></i> 기여 문서', array('title' => '내 기여 목록을 불러옵니다.')); ?>
                                        </li>
                                        <li>
                                            <?php echo '<a href="'.$url_prefix.'특수:로그아웃&returnto='.$_URITITLE.'"><i class="fa fa-times" aria-hidden="true"></i>  로그아웃</a>'; ?>
                                        </li>
                                    </ul>
                                </li>
<?php
                            } else {
?>  
                                <li>
                                    <a href="<?php echo $url_prefix; ?>특수:로그인&returnto=<?php echo $_URITITLE; ?>">
                                        <i class="fa fa-sign-in" aria-hidden="true"></i>
                                        <span id="mobile">로그인</span>
                                    </a>
                                </li>
<?php             
                            }
?>                
                        </ul>
                    </div>
                </div>
            </header>
            <div class="breadcrumbs">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 col-sm-4">
                            <h1><?php $this -> html('title'); ?></h1>
                            <?php $this -> html('subtitle'); ?>
                        </div>
                        <div class="col-lg-8 col-sm-8">
                            <ol class="breadcrumb pull-right">
<?php             
                                if(count($this -> data['content_actions']) > 0) {
                                    foreach($this -> data['content_actions'] as $pages) {
                                        echo '<li><a href="'.$pages['href'].'">'.$pages['text'].'</a></li>';
                                    }
                                } 
?>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section id="body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-10 col-md-offset-1 mar-b-30">
<?php 
                            if($this -> data['sitenotice'] && $_COOKIE['alertcheck'] != "yes") { 
?>
                                <div id="sitenotice">
                                    <?php $this -> html('sitenotice'); ?>
                                </div>
<?php
                            } 

                            if($this -> data['catlinks']) {
                                $this -> html('catlinks'); 
                                echo '<br>';
                            }

                            $this -> html('bodytext'); 
?>
                        </div>
                    </div>
                </div>
            </section>
            <div class="scroll-buttons">
                <a class="scroll-toc" href="#toc">
                    <i class="fa fa-list-alt" aria-hidden="true"></i>
                </a>
                <a class="scroll-button" href="#">
                    <i class="fa fa-arrow-up" aria-hidden="true"></i>
                </a>
                <a class="scroll-bottom" href="#footer">
                    <i class="fa fa-arrow-down" aria-hidden="true"></i>
                </a>
            </div>
            <footer class="footer-small" id="footer">
                <div class="container">
                    <div class="row">
                        <div class="copyright">
                            <p><?php $this -> html('copyright'); ?></p>
                            <a href="https://www.mediawiki.org">
                                <img class="pull-right" src="https://www.mediawiki.org/static/images/poweredby_mediawiki_88x31.png">
                            </a> 
                        </div>
                    </div>
                </div>
            </footer>
<?php
            $this -> html('bottomscripts');
            $this -> html('reporttime');

            if($this -> data['debug']) {
                $this -> text('debug');
            }
            
            echo '</body>';
            echo '</html>';
        }
    }
?> 