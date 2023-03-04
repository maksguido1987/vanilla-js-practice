const modal = $.modal({
  title: "Title",
  closable: true,
  content: `<h4>Hello</h4><p>lorem lorem lorem lorem</p>`,
  maxWidth: "500px",
  footerButtons: [
    {
      text: "Cancel",
      type: "secondary",
      handler: function () {
        modal.close();
      },
    },
    {
      text: "Ok",
      type: "primary",
      handler: function () {
        modal.close();
      },
    },
  ],
});
