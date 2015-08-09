(function(document, window) {
  // Override the anchors
  var parser = new DOMParser();
  var xhrTarget = document.querySelector('.main-main');

  var sectionEls = document.querySelectorAll('.sidebar section');
  for (var i = 0; i < sectionEls.length; i++) {
    var sectionEl = sectionEls.item(i);
    var sidebarListItems = sectionEl.querySelectorAll('li');
    for (var j = 0; j < sidebarListItems.length; j++) {
      var sidebarListItem = sidebarListItems.item(j);
      var sidebarLink = sidebarListItem.querySelector('a');
      sidebarLink.addEventListener('click', function(section, listItem, event) {
        // Update the history.
        history.pushState({}, '', this.href);

        // Removes any selected CSS elements
        var selectedSection = document.querySelector('.sidebar section.collapsible.selected');
        if (selectedSection) {
          selectedSection.classList.toggle('selected', false);
        }

        var selectedLink = document.querySelector('.sidebar li.sidebar-selected');
        if (selectedLink) {
          selectedLink.classList.toggle('sidebar-selected', false);
        }

        // Selects the link
        listItem.classList.toggle('sidebar-selected', true);
        section.classList.toggle('selected', true);

        // Grabs the page
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (4 != xhr.readyState) {
            return;
          }
          if (200 != xhr.status) {
            return;
          }

          xhrTarget.innerHTML = parser
              .parseFromString(xhr.responseText, 'text/html')
              .querySelector('.main-main')
              .innerHTML;
          xhrTarget.scrollTop = 0;

          prettyPrint();
        };
        xhr.open('GET', this.href);
        xhr.send();
        event.preventDefault();
      }.bind(sidebarLink, sectionEl, sidebarListItem));
    }
  }
})(document, window);
