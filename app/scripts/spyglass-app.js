/*!
  SPYGLASS – App
  ==============================
  Simple Search Results with EmberJS
*/

// Define Ember Application
var SgApp = window.SgApp = Ember.Application.create();

// App Scripts
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');


/*  
## POINTING TO SOLR 
*/

SgApp.searcher = Sg.SolrSearcher.create({

  // Point this value to your Solr instance
  url: "https://repository.library.brown.edu/api/search/",
  
  params: {

    // Edit this value to include the fields that you want to return
    "fl": "primary_title, abstract, pid", 
    "facet": true,
    "facet.field": ["mods_subject_ssim", "object_type"],
    "facet.limit": -1,

    "q": {},
    "fq": [],
    "start": 0,
    "rows": 10,
    //"wt": "json"
  },
  success: function (data) {},
  selectedFacets: Em.ArrayController.create({
    content: []
  })
});


/* 
## FACET GROUPS

Optionally, create a unique FacetGroup for each facet list 
that you will include in your application.

For example: 

````js

SgApp.facetGroup1 = Sg.FacetGroup.extend({
searcher: SgApp.searcher,
  fieldName: 'abstract_en',
  displayName: 'Abstract'
});

````
*/

SgApp.textFacetGroup = Sg.TextFacetGroup.extend({
  searcher: SgApp.searcher,
});

/*  
## YOU'RE DONE HERE.

Great, you've set up your application, now it is time to define how your results are output in the `index.html` file. 


/*  SEARCH BOX
==============================*/

SgApp.searchInput = Sg.SearchBox.extend({
  searcher: SgApp.searcher
});

SgApp.searchSubmit = Sg.SearchSubmit.extend({
  searcher: SgApp.searcher
});


/*  RESULTS
==============================*/

SgApp.results = Sg.ResultSet.extend({
  // templateName: 'results',
  searcher: SgApp.searcher
});



/*  FILTERS
==============================*/
// SgApp.searcher.selectedFacets = Sg.SelectedFilters;
