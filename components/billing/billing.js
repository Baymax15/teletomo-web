angular.module('teletomo').component('billing', {
  templateUrl: 'components/billing/billing.html',
  controller: function ($http, $scope) {

    loadBills();
    // bootstrap modal from bootstrap cdn
    let modal = new bootstrap.Modal('#add-bill-modal');
    $scope.addBillForm = {}

    $scope.addBill = function () {
      let bill = angular.copy($scope.addBillForm)
      createBill(bill);
      modal.hide();
    }

    $scope.removeBill = function(id) { 
      deleteBill(id);
    }




    function createBill(bill) {
      $http.post("http://localhost:8080/billing", bill).then(
        (res) => { $scope.bills = res.data.data },
        (err) => { console.error(err) }
      )
    }

    function deleteBill(id) {
      $http.delete(`http://localhost:8080/billing/${id}`).then(
        (res) => { if (res.data.data) loadBills() },
        (err) => { console.error(err); }
      )
    }

    function loadBills() {
      $http.get("http://localhost:8080/billing").then(
        (res) => { $scope.bills = res.data.data },
        (err) => { console.error(err) }
      );
    }
  }
}) 
