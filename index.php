<?php

/*
  Plugin Name: React ArticleCard Block Plugin
  Version: 1.0.0
  Author: Adam Grzeganek
  Description: Das "ArtikelCards"-Plugin bietet eine moderne, übersichtliche Darstellung von Artikeln als Kacheln.
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

function blockregister() {
    register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'blockregister' );

// Details-Seite hinzufügen
function my_plugin_add_details_page() {
    add_submenu_page(
        null, // Versteckt die Seite aus dem Hauptmenü
        'Details zu My React Block Plugin', // Seitentitel
        'Details anzeigen', // Titel im Plugin-Link
        'manage_options', // Berechtigungsstufe
        'my-react-block-plugin-details', // Slug der Seite
        'my_plugin_details_page' // Callback-Funktion für die Ausgabe der Seite
    );
}
add_action( 'admin_menu', 'my_plugin_add_details_page' );

// Callback-Funktion für die Details-Seite
function my_plugin_details_page() {
    echo '<div class="wrap">';
    echo '<h1>Details zu React ArticleCard Block Plugin</h1>';
    echo '<p>Das "ArtikelCards"-Plugin bietet eine moderne, übersichtliche Darstellung von Artikeln als Kacheln in WordPress. Es ist speziell dafür entwickelt, eine Artikelliste visuell ansprechend darzustellen und bietet eine intuitive Übersicht für Besucher. Die Kachelansicht verbessert die Benutzererfahrung und sorgt für eine schnelle Navigation durch verschiedene Artikel.</p>';
    echo '<p>Funktionen:</p>';
    echo '<ul style="list-style-type: disc; margin-left: 20px;">
            <li>Interaktive Kachelansicht: Die Artikel werden als Kacheln präsentiert, die ein einfaches Scrollen und Stöbern ermöglichen.</li>
            <li>Responsives Design: Optimierte Darstellung auf allen Geräten, einschließlich mobiler und Tablet-Ansichten.</li>
            <li>Dynamische Datenanbindung: Die Artikeldaten werden in Echtzeit geladen und aktualisiert, ohne die Seite neu laden zu müssen.</li>
            <li>Anpassbare Layouts und Filter: Verschiedene Kachelgrößen und Sortieroptionen ermöglichen eine flexible und benutzerfreundliche Darstellung.</li>
        </ul>';
    echo '<p>Mit ArtikelCards können WordPress-Nutzer ihre Artikel professionell und benutzerfreundlich präsentieren und die Interaktion mit der Website steigern.</p>';
    echo '</div>';
}


// Link „Details anzeigen“ zur Zeile mit Autor hinzufügen, mit JavaScript für ein Pop-up
function my_plugin_row_meta($links, $file) {
    if ( plugin_basename(__FILE__) === $file ) {
        $popup_link = '<a href="#" onclick="openPopup()">Details anzeigen</a>';
        $links[] = $popup_link;
    }
    return $links;
}
add_filter('plugin_row_meta', 'my_plugin_row_meta', 10, 2);

// JavaScript für das Pop-up-Fenster hinzufügen
function my_plugin_enqueue_popup_script() {
    ?>
    <script type="text/javascript">
        function openPopup() {
            window.open(
                "<?php echo admin_url('admin.php?page=my-react-block-plugin-details'); ?>",
                "Details anzeigen",
                "width=600,height=400,resizable,scrollbars"
            );
            return false; // Verhindert das Standardverhalten des Links
        }
    </script>
    <?php
}
add_action('admin_footer', 'my_plugin_enqueue_popup_script');
