<?php

/* table/structure/move_columns_dialog.twig */
class __TwigTemplate_ec196d4de6da17ebf1cda9bf312158406a38ba8aedf63e7350e2e7fc6af0595c extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<div id=\"move_columns_dialog\" class=\"hide\" title=\"";
        echo _gettext("Move columns");
        echo "\">
    <p>";
        // line 2
        echo _gettext("Move the columns by dragging them up and down.");
        echo "</p>
    <form action=\"tbl_structure.php\">
        <div>
            ";
        // line 5
        echo PhpMyAdmin\Url::getHiddenInputs(($context["db"] ?? null), ($context["table"] ?? null));
        echo "
            <ul></ul>
        </div>
    </form>
</div>
";
    }

    public function getTemplateName()
    {
        return "table/structure/move_columns_dialog.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  30 => 5,  24 => 2,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "table/structure/move_columns_dialog.twig", "/vagrant/phpMyAdmin-4.8.1-all-languages/templates/table/structure/move_columns_dialog.twig");
    }
}
